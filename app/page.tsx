
import TextForm from "./components/TextForm";
 
export default function Home() {
 return (
   <main className="page">
      <div className="card">
        <h1>Asistente de Texto con IA</h1>
        <p className="subtitle">
          Resumí textos, mejorá redacción y generá ideas con IA
        </p>
        <TextForm />
      </div>
    </main>
  );
}