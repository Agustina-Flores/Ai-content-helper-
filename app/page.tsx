"use client";

import { useState } from "react";
import TextForm from "./components/TextForm";
 
export default function Home() {
  const [text, setText] = useState("");
  const [action, setAction] = useState("summarize");
  const [result, setResult] = useState("");

  return (
    <main className="min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">
          AI Content Helper
        </h1>

        <TextForm
        text={text}
        action={action}
        onTextChange={setText}
        onActionChange={setAction}
        />

        <button
         className="w-full bg-black text-white rounded p-3"
         onClick={() => setResult("Resultado de prueba")}
        >
          Generar
        </button>
        {result && (
          <div className="border rounded p-3 bg-gray-50">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}