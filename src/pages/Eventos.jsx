import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EventContext } from "../context/EventContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ImagePlus, Plus, X, Trash2 } from "lucide-react";

const Eventos = () => {
  const { eventos, criarEvento, removerEvento } = useContext(EventContext);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    criarEvento(data.nome, data.data);
    reset();
    setShowForm(false);
  };

  return (
    <div className="space-y-8 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Eventos
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Gerencie seus eventos
          </p>
        </div>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:opacity-90 transition"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Cancelar" : "Novo Evento"}
        </button>

      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-card border rounded-xl p-6 max-w-md shadow-sm">

          <h2 className="text-base font-semibold mb-4">
            Criar novo evento
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            {/* NOME */}
            <div className="flex flex-col gap-1">

              <label className="text-sm font-medium text-muted-foreground">
                Nome do evento
              </label>

              <input
                type="text"
                placeholder="Ex: Casamento João & Maria"
                className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition
                ${
                  errors.nome
                    ? "border-red-400 focus:ring-red-200"
                    : "focus:ring-ring"
                }`}
                {...register("nome", {
                  required: "Nome obrigatório",
                })}
              />

              {errors.nome && (
                <p className="text-red-500 text-xs">
                  {errors.nome.message}
                </p>
              )}

            </div>

            {/* DATA */}
            <div className="flex flex-col gap-1">

              <label className="text-sm font-medium text-muted-foreground">
                Data do evento
              </label>

              <input
                type="date"
                className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition
                ${
                  errors.data
                    ? "border-red-400 focus:ring-red-200"
                    : "focus:ring-ring"
                }`}
                {...register("data", {
                  required: "Data obrigatória",
                })}
              />

              {errors.data && (
                <p className="text-red-500 text-xs">
                  {errors.data.message}
                </p>
              )}

            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:opacity-90 transition"
            >
              Criar Evento
            </button>

          </form>
        </div>
      )}

      {/* LISTA DE EVENTOS */}

      {eventos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">

          <p className="text-sm mb-2">
            Nenhum evento criado ainda
          </p>

          <p className="text-xs">
            Clique em <strong>Novo Evento</strong> para começar
          </p>

        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {eventos.map((evento) => (

            <Card
              key={evento.id}
              onClick={() =>
                navigate(`/dashboard/event/${evento.id}`)
              }
              className="relative cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all"
            >

              <CardHeader className="pb-2 flex items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  {evento.nome}
                </CardTitle>

                

              </CardHeader>


              <CardContent className="space-y-2">

                <p className="text-sm text-muted-foreground flex items-center gap-2">

                  <Calendar size={14} />

                  {evento.data
                    ? new Date(
                        evento.data + "T00:00:00"
                      ).toLocaleDateString("pt-BR")
                    : "Sem data"}

                </p>

                <p className="text-sm text-muted-foreground flex items-center gap-2">

                  <ImagePlus size={14} />

                  {evento.fotosApi.length +
                    evento.fotosUpload.length} fotos

                </p>

              </CardContent>

              <button
                  onClick={(e) => {
                    e.stopPropagation(); // impede abrir a página do evento
                    if (confirm("Deseja realmente excluir este evento?")) {
                      removerEvento(evento.id);
                    }
                  }}
                  className="absolute bottom-3 right-3 text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={16} />
              </button>

            </Card>
          ))}

        </div>
      )}
    </div>
  );
};

export default Eventos;

