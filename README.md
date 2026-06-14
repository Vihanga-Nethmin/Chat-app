# 💬 Real-Time Chat App (MERN)

A full-stack real-time chat application built with the **MERN stack** (MongoDB, Express, React, Node.js), featuring live messaging via **Socket.IO**, JWT-based authentication, online status indicators, unread message notifications, and a built-in **Gemini AI chatbot**.

![status](https://img.shields.io/badge/status-in%20development-yellow)

---

## ✨ Features

- 🔐 **Authentication** — secure signup/login with JWT stored in HTTP-only cookies and password hashing via `bcryptjs`
- 💬 **Real-time messaging** — instant message delivery powered by Socket.IO
- 🟢 **Online status** — see which contacts are currently online
- 🔔 **Unread message notifications** — toast alerts, notification sound, and unread badges on the sidebar for new messages
- 🔍 **Search** — quickly find a conversation by name
- 🤖 **Gemini AI chatbot** — chat with Google's Gemini AI directly inside the app, just like any other contact
- 🎨 **Modern UI** — built with Tailwind CSS and DaisyUI

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS + DaisyUI
- Zustand (state management)
- React Router
- Socket.IO Client
- React Hot Toast

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- Socket.IO
- JWT (`jsonwebtoken`) + `bcryptjs`
- Google Gemini API

---

## 📁 Project Structure

```
Chat-app/
├── backend/
│   ├── constants/        # Shared constants (e.g. AI bot ID)
│   ├── controllers/       # Route logic (auth, messages, users)
│   ├── db/                 # MongoDB connection
│   ├── middleware/         # Auth middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── seed/                # DB seed scripts (Gemini AI user)
│   ├── socket/              # Socket.IO setup
│   ├── utils/                # Helper functions (token, Gemini API)
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components (sidebar, messages, etc.)
│   │   ├── context/           # Auth & Socket context
│   │   ├── hooks/              # Custom hooks
│   │   ├── pages/               # Login, Signup, Home
│   │   ├── zustand/              # Global state store
│   │   └── App.jsx
│   └── vite.config.js
├── .env
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)
- A [Gemini API key](https://aistudio.google.com/app/apikey) (for the AI chatbot)

### 1. Clone the repository
```bash
git clone https://github.com/Vihanga-Nethmin/Chat-app.git
cd Chat-app
```

### 2. Install dependencies
```bash
# Backend
npm install

# Frontend
cd frontend
npm install
cd ..
```

### 3. Configure environment variables
Create a `.env` file in the project root:

```env
PORT=5000
MONGO_DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Seed the Gemini AI contact
This adds "Gemini AI" as a chat contact so users can chat with it like any other user:

```bash
npm run seed:ai
```

### 5. Run the app

Start the backend (from the project root):
```bash
npm run server
```

Start the frontend (in a separate terminal):
```bash
cd frontend
npm run dev
```

The app will be available at **http://localhost:3000**, with the API running on **http://localhost:5000**.

---

## 🤖 Gemini AI Chat

The "Gemini AI" contact appears automatically in the sidebar for every user. Messages sent to it are forwarded to the Gemini API, and the AI's response is saved and displayed in the conversation just like a normal chat message.

---

## 🗺️ Roadmap

- [ ] Convert frontend to TypeScript
- [ ] Add Redux for state management
- [ ] Role-based authorization
- [ ] "Gemini is typing..." indicator
- [ ] Message read receipts

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
