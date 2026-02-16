"use client";

import { useState } from "react";
import { Action } from "../type/Action";

export default function TextForm() { 

  const [text, setText] = useState("");
  const [action, setAction] = useState<Action>("summarize");
  const [result, setResult] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(false);  
  const MAX_LENGTH = 2000;

  const handleGenerate  = async () => { 
    setLoading(true); 
    setResult(""); 

    try {
      const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, action }),
      
    }); 
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await response.json();
    setResult(data.result); 
    setDemoMode(data.demoMode ?? false);
    } catch (error) {
    setResult("Error generando contenido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <p className="hint">Texto de entrada</p>
      <textarea
        rows={6}
        placeholder="Pegá tu texto acá..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
        style={{ width: "100%" }}
        maxLength={MAX_LENGTH}
      />
      {!text.trim() && (
        <p className="helper-text">
          Escribí o pegá un texto para comenzar.
        </p>
      )}
      {text.trim() && (
        <p className="helper-text">
          {text.length}/{MAX_LENGTH}
        </p>
      )}
      <p className="hint">
          Elegí qué querés hacer con tu texto
      </p>
      <select value={action} onChange={(e) => setAction(e.target.value as Action)}>
        <option value="summarize">Resumir texto</option>
        <option value="improve">Mejorar redacción</option>
        <option value="ideas">Generar ideas</option>
      </select>
      
      <button onClick={handleGenerate} disabled={loading || !text.trim()}>
        {loading ? "Generando..." : "Generar"}
      </button> 
      <>
        <h3 className="result-title">✨ Resultado</h3>
        <pre className="result">
          {result}
        </pre>
      </>
      {demoMode && (
        <p className="demo-warning ">
          ⚠️ Ejecutando en modo demo (API no disponible)
        </p>
      )}
    </div>
  );
}
