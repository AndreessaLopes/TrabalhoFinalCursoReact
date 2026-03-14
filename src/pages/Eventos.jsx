import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EventContext } from "../context/EventContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ImagePlus, Plus, X } from "lucide-react";

const Eventos = () => {
  const { eventos, criarEvento } = useContext(EventContext);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);  // ← renderização condicional

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    criarEvento(data.nome, data.data);
    reset();
    setShowForm(false);
  };

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Eventos</h1>
          <p className="text-sm text-muted-foreground mt-1">Gerencie seus eventos</p>
        </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Cancelar" : "Novo Evento"}
        </button>
      </div>

      {/* Formulário — renderização condicional */}
      {showForm && (
        <div className="bg-card border rounded-xl p-6 max-w-md">
          <h2 className="text-base font-semibold mb-4">Criar novo evento</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-muted-foreground">Nome</label>
              <input
                type="text"
                placeholder="Ex: Casamento João & Maria"
                className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 
                  ${errors.nome ? "border-red-400 focus:ring-red-200" : "focus:ring-ring"}`}
                {...register("nome", { required: "Nome obrigatório" })}
              />
              {errors.nome && (
                <p className="text-red-500 text-xs">{errors.nome.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Data</label>
              <input
                type="date"
                className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${errors.data ? "border-red-400 focus:ring-red-200" : "focus:ring-gray-300"}`}
                {...register("data", { required: "Data obrigatória" })}
              />
              {errors.data && (
                <p className="text-red-500 text-xs">{errors.data.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:opacity-90 transition-colors"
            >
              Criar Evento
            </button>
          </form>
        </div>
      )}

      {/* Lista de eventos */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {eventos.map((evento) => (
          <Card
            key={evento.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/dashboard/event/${evento.id}`)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{evento.nome}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar size={14} />
                {evento.data
                  ? new Date(evento.data + "T00:00:00").toLocaleDateString("pt-BR")
                  : "Sem data"}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <ImagePlus size={14} />
                {evento.fotosApi.length + evento.fotosUpload.length} fotos
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Eventos;