"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [action, setAction] = useState("summarize");

  return (
    <main className="min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">
          AI Content Helper
        </h1>

        <textarea
          className="w-full border rounded p-3"
          rows={6}
          placeholder="Escribí o pegá tu texto acá..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          className="w-full border rounded p-2"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="summarize">Resumir texto</option>
          <option value="improve">Mejorar redacción</option>
          <option value="ideas">Generar ideas</option>
        </select>

        <button
          className="w-full bg-black text-white rounded p-3"
        >
          Generar
        </button>
      </div>
    </main>
  );
}