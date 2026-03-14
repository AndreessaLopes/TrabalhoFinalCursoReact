import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { EventContext } from "../context/EventContext";
import { ArrowLeft } from "lucide-react";

const GaleriaEvento = () => {
  const { eventId } = useParams();
  const { eventos, adicionarFoto } = useContext(EventContext);
  const navigate = useNavigate();

  const evento = eventos.find((e) => e.id === Number(eventId));
  if (!evento) return <p className="p-6 text-muted-foreground">Evento não encontrado</p>;

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    adicionarFoto(evento.id, URL.createObjectURL(file));
  };

  const todasFotos = [...(evento.fotosApi || []), ...(evento.fotosUpload || [])];

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/dashboard/fotos")}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors"
          >
            <ArrowLeft size={16} /> Voltar
          </button>
          <h2 className="text-2xl font-semibold text-foreground">{evento.nome}</h2>
          <p className="text-sm text-muted-foreground">{todasFotos.length} foto(s)</p>
        </div>

        <label className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity">
          + Upload de Foto
          <input type="file" accept="image/*" onChange={handleUpload} hidden />
        </label>
      </div>

      {/* Vazio */}
      {todasFotos.length === 0 && (
        <p className="text-muted-foreground text-sm">Nenhuma foto ainda.</p>
      )}

      {/* Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
        {todasFotos.map((foto, index) => (
          <img
            key={index}
            src={foto}
            alt={`foto-${index}`}
            className="w-full h-48 object-cover rounded-xl"
          />
        ))}
      </div>
    </div>
  );
};

export default GaleriaEvento;