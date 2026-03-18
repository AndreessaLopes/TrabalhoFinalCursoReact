import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { EventContext } from "../context/EventContext";
import { ArrowLeft, Trash2 } from "lucide-react";

const GaleriaEvento = () => {
  const { eventId } = useParams();
  const { eventos, adicionarFoto, removerFoto } = useContext(EventContext);
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
    <div className="space-y-8 p-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>
          <button
            onClick={() => navigate("/dashboard/fotos")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-2"
          >
            <ArrowLeft size={16} /> Voltar
          </button>

          <h2 className="text-3xl font-bold">{evento.nome}</h2>
          <p className="text-muted-foreground text-sm">
            {todasFotos.length} foto{todasFotos.length !== 1 && "s"}
          </p>
        </div>

        {/* BOTÃO UPLOAD */}
        <label className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:opacity-90 transition">
          + Adicionar Foto
          <input type="file" accept="image/*" onChange={handleUpload} hidden />
        </label>
      </div>

      {/* GALERIA VAZIA */}
      {todasFotos.length === 0 && (
        <div className="border border-dashed rounded-xl p-10 text-center text-muted-foreground">
          Nenhuma foto ainda. Adicione a primeira 📸
        </div>
      )}

      {/* GRID DE FOTOS */}
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">

        {todasFotos.map((foto, index) => (

          <div
            key={index}
            className="relative group overflow-hidden rounded-xl"
          >

            <img
              src={foto}
              alt={`foto-${index}`}
              className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

              <button
                onClick={() => removerFoto(evento.id, index)}
                className="bg-white text-red-500 p-2 rounded-full shadow hover:scale-110 transition"
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default GaleriaEvento;
