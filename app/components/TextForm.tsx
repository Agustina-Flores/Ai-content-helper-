"use client";

import { useState } from "react";
import { fakeAI,Action } from "../lib/aiMock";

export default function TextForm() { 

  const [text, setText] = useState("");
  const [action, setAction] = useState<Action>("summarize");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const response = fakeAI(text, action);
      setResult(response);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="container">
      <p className="hint">Texto de entrada</p>
      <textarea
        rows={6}
        placeholder="Pegá tu texto acá..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%" }}
      />
      <p className="hint">
            Elegí qué querés hacer con tu texto
      </p>
      <select value={action} onChange={(e) => setAction(e.target.value as Action)}>
        <option value="summarize">Resumir texto</option>
        <option value="improve">Mejorar redacción</option>
        <option value="ideas">Generar ideas</option>
      </select>
      
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generando..." : "Generar"}
      </button>
      <p className="hint">Resultado generado</p>
      {result && (
        <pre className="result">
          {result}
        </pre>
      )}
    </div>
  );
}
