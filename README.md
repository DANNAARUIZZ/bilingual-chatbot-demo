# 🧁 Suqiée Repostería - Chatbot Asistente Virtual

Chatbot de atención al cliente para **Suqiée Repostería** (Los Pasteles de Luzma), pastelería artesanal en Hermosillo, Sonora.

## Funcionalidades

- Responde preguntas sobre productos, precios, horarios y sucursales
- Información sobre pedidos especiales y cotizaciones
- Bilingüe (español/inglés) - detecta automáticamente el idioma
- Tono cálido y cercano, como parte del equipo de Suqiée

## Stack

- **Frontend:** HTML, CSS, JavaScript vanilla
- **Backend:** Node.js + Express
- **AI:** Claude (Anthropic API)
- **Deploy:** Railway

## Configuración Local

```bash
npm install
```

Crear archivo `.env` con:
```
ANTHROPIC_API_KEY=tu-api-key-aqui
```

Iniciar:
```bash
npm start
```

El servidor correrá en `http://localhost:3000`

## Deploy en Railway

1. Conectar el repo de GitHub en [Railway](https://railway.app)
2. Agregar variable de entorno: `ANTHROPIC_API_KEY`
3. Railway detecta automáticamente Node.js y ejecuta `npm start`
4. ¡Listo! Se genera un URL público para compartir

## Estructura

```
├── server.js            # Servidor Express + API de Claude
├── knowledge-base.js    # Base de conocimiento de Suqiée
├── public/
│   ├── index.html       # Frontend del chat
│   ├── style.css        # Estilos (colores Suqiée)
│   └── app.js           # Lógica del frontend
├── package.json
├── Procfile
└── .gitignore
```
