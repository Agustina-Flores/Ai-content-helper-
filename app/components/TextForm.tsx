"use client";

type Props = {
  text: string;
  action: string;
  onTextChange: (value: string) => void;
  onActionChange: (value: string) => void;
};

export default function TextForm({
  text,
  action,
  onTextChange,
  onActionChange,
}: Props) {
  return (
    <>
      <textarea
        className="w-full border rounded p-3"
        rows={6}
        placeholder="Escribí o pegá tu texto acá..."
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
      />

      <select
        className="w-full border rounded p-2"
        value={action}
        onChange={(e) => onActionChange(e.target.value)}
      >
        <option value="summarize">Resumir texto</option>
        <option value="improve">Mejorar redacción</option>
        <option value="ideas">Generar ideas</option>
      </select>
    </>
  );
}
