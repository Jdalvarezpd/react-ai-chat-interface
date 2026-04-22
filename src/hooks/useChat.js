import { useState, useEffect, useRef } from 'react';

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;
const STORAGE_KEY = "lus_pilot_state_v1";

function makeSessionId() {
  return "sess_" + Date.now() + "_" + Math.random().toString(16).slice(2);
}

function defaultState() {
  return {
    sessionId: localStorage.getItem("lus_sessionId") || makeSessionId(),
    step: 1,
    users_data: { name: null, email: null, phone: null, summary: "" }
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw);
    if (!s.sessionId) return defaultState();
    if (!s.step) s.step = 1;
    if (!s.users_data) s.users_data = defaultState().users_data;
    return s;
  } catch {
    return defaultState();
  }
}

function saveState(s) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  localStorage.setItem("lus_sessionId", s.sessionId);
}

function shouldFireOnce(sessionId, conversionType) {
  const sid = sessionId || "no_session";
  const ctype = conversionType || "default";
  const key = `lus_conv_sent_v1:${sid}:${ctype}`;

  if (localStorage.getItem(key) === "1") return false;
  localStorage.setItem(key, "1");
  return true;
}

export function useChat() {
  const [state, setState] = useState(loadState);
  const [messages, setMessages] = useState([]);
  const [quickReplies, setQuickReplies] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const initRef = useRef(false);

  // We use a ref to always have access to the latest state inside async functions
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
    saveState(state);
  }, [state]);

  const advanceStep = () => {
    setState(prev => ({
      ...prev,
      step: Math.min(6, (prev.step || 1) + 1)
    }));
  };

  const sendMessage = async (text, isInit = false, customState = null) => {
    const currentState = customState || stateRef.current;
    const msg = (text || "").trim();
    if (!msg && currentState.step !== 1 && !isInit) return;

    setError(null);
    if (!isInit && msg) {
      setMessages(prev => [...prev, { role: "user", text: msg }]);
      setQuickReplies([]);
    }

    setIsTyping(true);

    try {
      const payload = {
        sessionId: currentState.sessionId,
        step: currentState.step,
        message: msg,
        users_data: currentState.users_data
      };

      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("HTTP " + res.status);
      }
      
      const data = await res.json();

      // Tracking
      if (data.tracking?.conversion === true) {
        const ctype = data.tracking.conversion_type || "lead";
        if (shouldFireOnce(data.sessionId || currentState.sessionId, ctype)) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "chat_conversion",
            chat_type: ctype,
            session_id: data.sessionId || currentState.sessionId
          });
          console.log("✅ chat_conversion:", ctype);
        }
      }

      setState(prev => {
        const nextState = { ...prev };
        if (data.sessionId) nextState.sessionId = data.sessionId;
        if (data.users_data) nextState.users_data = data.users_data;
        return nextState;
      });

      setMessages(prev => [...prev, { role: "bot", text: data.texto || "" }]);
      setQuickReplies(data.botones || []);
      advanceStep();

    } catch (e) {
      setError("Error: " + (e.message || "No se pudo conectar."));
    } finally {
      setIsTyping(false);
    }
  };

  const ensureIntro = async () => {
    if (initRef.current) return;
    initRef.current = true;

    // Because we don't store message history in React state or localStorage,
    // a page reload means the UI is empty. We must reset the session and step,
    // just like the robust auto-start in the original agent.js did.
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("lus_sessionId");
    
    const freshState = {
      sessionId: makeSessionId(),
      step: 1,
      users_data: { name: null, email: null, phone: null, summary: "" }
    };
    
    setState(freshState);
    stateRef.current = freshState;
    saveState(freshState);

    await sendMessage("", true, freshState);
  };

  useEffect(() => {
    ensureIntro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetChat = () => {
    localStorage.removeItem(STORAGE_KEY);
    const newState = loadState();
    setState(newState);
    setMessages([]);
    setQuickReplies([]);
    setError(null);
    initRef.current = false;
    setTimeout(() => ensureIntro(), 100);
  };

  return {
    state,
    messages,
    quickReplies,
    isTyping,
    error,
    sendMessage,
    resetChat
  };
}
