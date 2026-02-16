import { NextResponse } from "next/server";
import OpenAI from "openai";

let openai: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function POST(req: Request) {
  let text = "";
  let action = "";

  try {
    const body: { text: string; action: string } = await req.json();

    text = body.text;
    action = body.action;

    if (!text) {
      return NextResponse.json(
        { error: "No se recibió texto." },
        { status: 400 }
      );
    }

    const prompt = {
      summarize: `Resumí el siguiente texto de forma clara y profesional:\n\n${text}`,
      improve: `Mejorá la redacción del siguiente texto haciéndolo más profesional:\n\n${text}`,
      ideas: `Generá ideas creativas basadas en el siguiente texto:\n\n${text}`,
    };


    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Sos un asistente experto en redacción y generación de contenido.",
        },
        {
          role: "user",
          content:
            prompt[action as keyof typeof prompt] ||
            `Procesá el siguiente texto:\n\n${text}`,
        },
      ],
    });

    return NextResponse.json({
      result: completion.choices[0].message.content,
      demoMode: false,
    });

  } catch (error) {
    console.error("OpenAI error:", error);

    
    let fallbackResult = "";

    switch (action) {
      case "summarize":
        fallbackResult =
          "Resumen:\n" + text.split(".").slice(0, 2).join(".").trim() + ".";
        break;

      case "improve":
        fallbackResult =
          "Versión mejorada:\n" +
          text
            .split(".")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(". ") +
          ".";
        break;

      case "ideas":
        fallbackResult = `Ideas generadas:
        - Publicación para redes sociales
        - Idea para blog
        - Guión para video`;
        break;

      default:
        fallbackResult = "La IA no está disponible actualmente.";
    }

    return NextResponse.json({
      result: fallbackResult,
      demoMode: true,
    });
  }
}