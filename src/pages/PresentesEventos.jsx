import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { EventContext } from "../context/EventContext";
import { ArrowLeft, Plus, Trash2, Gift } from "lucide-react";

const ListaPresentesEvento = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const { eventos, adicionarPresente, removerPresente } = useContext(EventContext);

  // Linha que busca o evento — converte para número
const evento = eventos.find((e) => e.id === Number(eventId)); // ✅ já está assim

  const [novoPresente, setNovoPresente] = useState("");

  if (!evento) return <p className="p-6">Evento não encontrado</p>;

  const handleAdd = () => {
  if (!novoPresente.trim()) return;

  console.log("Adicionando presente:", novoPresente);

  adicionarPresente(evento.id, novoPresente);

  setNovoPresente("");
};

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <button
            onClick={() => navigate("/dashboard/presentes")}
            className="flex items-center gap-1 text-sm mb-2 hover:opacity-80"
          >
            <ArrowLeft size={16} /> Voltar
          </button>

          <h2 className="text-2xl font-semibold">
            {evento.nome}
          </h2>

          <p className="text-sm text-muted-foreground">
            {evento.presentes?.length || 0} presentes
          </p>

        </div>

      </div>

      {/* Adicionar presente */}

      <div className="flex gap-2 max-w-md">

        <input
          type="text"
          placeholder="Ex: Jogo de panelas"
          value={novoPresente}
          onChange={(e) => setNovoPresente(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
        />

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-black px-4 py-2 border rounded-lg text-sm cursor-pointer hover:opacity-90"
        >
          <Plus size={16} />
          Adicionar
        </button>

      </div>

      {/* Lista */}

      {evento.presentes?.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Gift size={40} className="mb-3 opacity-50" />
          <p className="text-sm">Nenhum presente adicionado</p>
        </div>

      ) : (

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">

          {evento.presentes.map((presente) => (

            <div
              key={presente.id}
              className="border rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition"
            >

              <span className="text-sm">{presente.nome}</span>

              <button
                onClick={() => removerPresente(evento.id, presente.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default ListaPresentesEvento;