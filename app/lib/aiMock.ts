export type Action = "summarize" | "improve" | "ideas";

export function fakeAI(text: string, action: Action): string {

    if (!text.trim()) return "Por favor ingresá un texto.";

    switch (action) {
    case "summarize":
      return `Resumen:\n${text.slice(0, 120)}...`;

    case "improve":
      return `Versión mejorada:\n${text.charAt(0).toUpperCase() + text.slice(1)}.`;

    case "ideas":
      return `Ideas generadas:
    - Publicación para redes sociales
    - Idea para un artículo
    - Guión para video corto`;

        default:
        return "Acción no soportada.";
    }
};