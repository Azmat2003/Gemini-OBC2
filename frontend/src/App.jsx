
import React, { useState } from 'react'

function App() {
  const [msg, setMsg] = useState('');
  const [chats, setChats] = useState([]);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');

    let message = msg.trim();
    if (!message) {
      return;
    }

    const obj = {
      role: "user",
      data: message
    }

    const newChats = [...chats, obj];
    setChats(newChats);
    setMsg('');

    try {
      const BASE_URL = import.meta.env.VITE_BACKEND_URL;
      const api = `${BASE_URL}/api/chat/ask`;

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chats: newChats })
      }

      const res = await fetch(api, options);
      const data = await res.json();

      if (!res.ok) {
        throw new Error('AI Service Down')
      }

      const obj2 = {
        role: "model",
        data: data.answer
      }

      const newChat2 = [...newChats, obj2];
      setChats(newChat2);
    }
    catch (err) {
      setError(err.message);
      const obj2 = {
        role: "model",
        data: err.message
      }
      const newChat2 = [...newChats, obj2];
      setChats(newChat2);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center px-4 py-8">

      {/* Header */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-2xl">✦</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              AI Assistant
            </h1>
            <p className="text-sm text-slate-400">
              Your intelligent chat companion
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="w-full max-w-3xl flex-1 min-h-[450px] max-h-[650px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold">Conversation</h2>
            <p className="text-xs text-slate-500">Ask me anything</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span className="text-xs text-slate-400">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {chats.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
                <span className="text-3xl">💬</span>
              </div>

              <h3 className="text-white text-lg font-semibold">
                How can I help you today?
              </h3>

              <p className="text-slate-400 text-sm mt-2 max-w-xs">
                Start a conversation by typing your question below.
              </p>
            </div>
          )}

          {chats.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >

              {message.role !== 'user' && (
                <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                  <span className="text-white">✦</span>
                </div>
              )}

              <div
                className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-7 whitespace-pre-wrap break-words ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-sm'
                }`}
              >
                {message.data}
              </div>

            </div>
          ))}

        </div>

        {/* Input Area */}
        <div className="p-5 border-t border-slate-800 bg-slate-900">

          <form onSubmit={handleSubmit} className="flex items-center gap-3">

            <input
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white text-sm outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-6 py-4 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/20"
            >
              Send ↗
            </button>

          </form>

          {error && (
            <p className="text-red-400 text-xs mt-3">
              {error}
            </p>
          )}

          <p className="text-center text-xs text-slate-600 mt-4">
            AI can make mistakes. Verify important information.
          </p>

        </div>

      </div>

    </div>
  )
}

export default App
