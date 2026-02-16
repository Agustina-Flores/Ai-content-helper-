import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});


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
            content: "Sos un asistente experto en redacción y generación de contenido.",
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
        });

    } catch (error) {
        console.error("OpenAI error:", error);
        
        let isError = false;

        if (
            typeof error === "object" &&
            error !== null &&
            "status" in error
        ) {
            const err = error as { status?: number };
            isError = err.status === 429;
        }

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
                .map((s: string) => s.trim())
                .filter(Boolean)
                .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
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
            fallbackResult = "La IA no está disponible actualmente (modo demo).";
            }

        return NextResponse.json({ result: fallbackResult , demoMode: isError});
    }
        
}