# 💬 Interfaz de Chat Inteligente en React

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![n8n](https://img.shields.io/badge/n8n-FF6D5A?style=for-the-badge&logo=n8n&logoColor=white)

> 🔗 **Ver Proyecto en Vivo:** [Scale with Clarity](https://linkedupsales.com/scale-with-clarity/)
Una solución integral y moderna de Asistencia Conversacional (Chatbot) basada en componentes estructurados de **React** y orquestada lógicamente por flujos automatizados de **n8n**. Este proyecto proporciona una interfaz de usuario fluida, estéticamente impecable y con una experiencia de uso equivalente a las plataformas líderes en Inteligencia Artificial.

## ✨ Características de Alto Nivel

- **Arquitectura de Componentes:** Diseñado pensando en un proyecto escalable. La lógica está dividida inteligentemente en Módulos separados y Hooks interactivos personalizados (ej: `useChat.js`).
- **Estados Reactivos en Tiempo Real:** Interfaz 100% viva. Incluye transiciones nativas y un auto-desplazamiento (autoscroll) del chat de forma instantánea gracias a la gestión de dependencias centralizadas de React.
- **Seguridad Garantizada:** Gracias a las mejores prácticas de la industria, el enlace (Webhook) de comunicación hacia la nube de n8n no está expuesto en este código fuente. Se inyecta de forma privada a través de variables de entorno seguras (`.env`).
- **Memoria de Sesión (State Memory):** Emplea almacenamiento del navegador (`localStorage`) para mantener la memoria y continuidad de las conversaciones y del usuario, incluso si la pestaña se refresca constantemente.
- **Seguimiento de Conversiones (UX/UI Analytics):** Los eventos que suceden dentro del chat pueden desencadenar eventos analíticos (DataLayer Pushes) que rastrean el enganche de los clientes (leads).

## 🛠️ Tecnologías Empleadas

- **Librería de Componentes:** [React 18+](https://react.dev/)
- **Entorno de Compilación Rápida:** [Vite](https://vitejs.dev/) - Garantiza recarga de módulos y renderizado casi a la velocidad de la luz.
- **Microservicios (Automatización):** n8n (Motor central de Webhooks, IA cognitiva y respuestas estructuradas).
- **Estilización Premium:** Archivos CSS robustos pero minimalistas, con el diseño pulido, dinámico y oscuro (Dark Theme) perfecto para ecosistemas de mercado de alto impacto (B2B).

## 🚀 ¿Cómo funciona tras bambalinas?

El ecosistema fluye como una coreografía muy rápida y ligera:

1. **El Usuario Pregunta:** El módulo `ChatInput.jsx` envía la tecla Enter del usuario y pasa el valor visual a `ChatWidget.jsx`.
2. **Orquestación Asíncrona:** El entorno `useChat.js` intercepta el texto y despacha silenciosamente una petición POST en milisegundos hacia nuestro identificador secreto `VITE_N8N_WEBHOOK_URL`.
3. **El Cerebro de la IA (n8n):** El webhook se activa, el contexto se alínea con nuestra lógica base, viaja hacia un LLM (como OpenAI) y procesa todo entregando código amigable final para el sistema frontend.
4. **Respuesta Veloz:** El sistema React pinta el Document Object Model (DOM) automáticamente inyectando el texto visualmente en la burbuja de respuesta.

## ⚙️ Guía de Montaje Rápido (Entorno Local)

Para disfrutar, analizar o construir sobre este entorno en tu máquina, sigue estos directos comandos:

1. **Obtener el Repositorio de Código**
   ```bash
   git clone https://github.com/Jdalvarezpd/react-ai-chat-interface.git
   cd react-ai-chat-interface
   ```

2. **Instalar Dependencias Base**
   ```bash
   npm install
   ```

3. **Inyectar las Credenciales Secretas de Conexión**
   Debes ser metódico acá: Crea un nuevo archivo en el directorio raíz de este código y llámalo exclusivamente: `.env`. Su función será alojar tu Webhook (ya que mi regla de `.gitignore` mantendrá a los espías afuera previniendo que se suba a GitHub).
   Copia esto adentro modificando solo la URL real por el webhook final en vivo de n8n:
   ```env
   VITE_N8N_WEBHOOK_URL=https://[TU-URL-N8N]/webhook/[ID]/chat
   ```

4. **Accionar el Despliegue en Pruebas**
   ```bash
   npm run dev
   ```
   *El navegador despegará. Simplemente accede a `http://localhost:5173` para empezar a charlar con tus neuronas visuales.*

## 🛡️ Despliegue Público (Deploy) y Política Anti-Robo (CORS)

Como medida innegociable de seguridad y buenas costumbres cibernéticas, al alojar este valioso empaquetado final de React (en infraestructuras como Vercel, o servicios de pago) la variable de entorno `.env` terminará renderizándose públicamente (como pasa siempre). Por lo cual:
En tu plataforma automatizadora N8N (en el origen del webhook) acude a "Security" (CORS) y selecciona la casilla de **Opciones de los dominios restrictivos (Allowed Origins)** dictaminándole expresamente y como única condición, habilitar sólo tráficos provenientes del link final donde instalaste tu portafolio. ¡Cualquier URL "Intrusa" que intente probarlo recibirá un rotundo error!.

---
*Arquitectura, visual and user experience liderado y desarrollado por **Juan David Alvarez**.*
