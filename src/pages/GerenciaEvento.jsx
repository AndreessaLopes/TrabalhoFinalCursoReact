import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { EventContext } from "../context/EventContext";
import { useForm } from "react-hook-form";
import { ArrowLeft, Calendar, ImagePlus, Plus, X, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GerenciaEvento = () => {
  const { eventos, adicionarConvidado, toggleConfirmado, adicionarGasto } =
    useContext(EventContext);

  const { eventId: id } = useParams();
  const navigate = useNavigate();

  const evento = eventos.find((e) => e.id === Number(id));
  if (!evento) return <p className="p-6">Evento não encontrado.</p>;

  const totalGastos = evento.gastos.reduce((acc, g) => acc + g.valor, 0);
  const confirmados = evento.convidados.filter((c) => c.confirmado).length;

  return (
    <div className="max-w-6xl mx-auto space-y-10 p-6">

      {/* HEADER */}
      <div className="flex flex-col gap-3 border-b pb-6">

        <button
          onClick={() => navigate("/dashboard/event")}
          className="flex items-center gap-1 text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Voltar para eventos
        </button>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {evento.nome}
          </h1>

          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <Calendar size={14} />
            {evento.data
              ? new Date(evento.data + "T00:00:00").toLocaleDateString("pt-BR")
              : "Sem data"}
          </p>
        </div>
      </div>

      {/* CARDS RESUMO */}
      <div className="grid gap-4 sm:grid-cols-3">

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Fotos
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {evento.fotosApi.length + evento.fotosUpload.length}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Convidados
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {confirmados}/{evento.convidados.length}
            </p>

            <p className="text-xs text-muted-foreground">
              confirmados
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Gastos
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              R$ {totalGastos.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ATALHO GALERIA */}
      <Card
        onClick={() => navigate(`/dashboard/fotos/${evento.id}`)}
        className="cursor-pointer hover:shadow-md transition"
      >
        <CardContent className="flex items-center gap-4 p-5">

          <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <ImagePlus size={20} />
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">
              Galeria de Fotos
            </p>

            <p className="text-xs text-muted-foreground">
              Visualizar e adicionar fotos do evento
            </p>
          </div>

        </CardContent>
      </Card>

      {/* SEÇÃO CONVIDADOS */}
      <ConvidadosSection
        evento={evento}
        adicionarConvidado={adicionarConvidado}
        toggleConfirmado={toggleConfirmado}
      />

      {/* SEÇÃO GASTOS */}
      <GastosSection
        evento={evento}
        adicionarGasto={adicionarGasto}
      />

    </div>
  );
};

/* ---------------- CONVIDADOS ---------------- */

const ConvidadosSection = ({
  evento,
  adicionarConvidado,
  toggleConfirmado,
}) => {

  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    adicionarConvidado(evento.id, data.nome);
    reset();
    setShowForm(false);
  };

  return (
    <Card className="p-6 space-y-5">

      <div className="flex items-center justify-between">

        <h2 className="text-lg font-semibold text-foreground">
          Convidados
        </h2>

        <button
          onClick={() => setShowForm((p) => !p)}
          className="flex items-center gap-1 text-sm bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? "Cancelar" : "Adicionar"}
        </button>

      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-3 max-w-md bg-muted/30 border rounded-lg p-3"
        >

          <input
            type="text"
            placeholder="Nome do convidado"
            className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
              ${errors.nome ? "border-red-400" : "focus:ring-ring"}`}
            {...register("nome", { required: true })}
          />

          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:opacity-90"
          >
            Salvar
          </button>

        </form>
      )}

      {evento.convidados.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhum convidado ainda.
        </p>
      ) : (
        <div className="space-y-2">

          {evento.convidados.map((c) => (

            <div
              key={c.id}
              className="flex items-center justify-between bg-card border rounded-lg px-4 py-3 hover:bg-muted transition"
            >

              <span
                className={`text-sm ${
                  c.confirmado
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {c.nome}
              </span>

              <button
                onClick={() => toggleConfirmado(evento.id, c.id)}
                className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full transition
                ${
                  c.confirmado
                    ? "bg-green-100 text-green-700"
                    : "bg-muted text-muted-foreground hover:bg-green-50 hover:text-green-600"
                }`}
              >

                <Check size={12} />

                {c.confirmado ? "Confirmado" : "Confirmar"}

              </button>

            </div>

          ))}

        </div>
      )}
    </Card>
  );
};

/* ---------------- GASTOS ---------------- */

const GastosSection = ({ evento, adicionarGasto }) => {

  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    adicionarGasto(evento.id, data.titulo, data.valor, data.categoria);
    reset();
    setShowForm(false);
  };

  const totalGastos = evento.gastos.reduce((acc, g) => acc + g.valor, 0);

  return (
    <Card className="p-6 space-y-5">

      <div className="flex items-center justify-between">

        <h2 className="text-lg font-semibold text-foreground">
          Gastos
        </h2>

        <button
          onClick={() => setShowForm((p) => !p)}
          className="flex items-center gap-1 text-sm bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? "Cancelar" : "Adicionar"}
        </button>

      </div>

      {showForm && (

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-muted/30 border rounded-xl p-4 max-w-md space-y-3"
        >

          <input
            type="text"
            placeholder="Ex: Buffet, Decoração..."
            className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
            ${errors.titulo ? "border-red-400" : "focus:ring-ring"}`}
            {...register("titulo", { required: true })}
          />

          <div className="flex gap-3">

            <input
              type="number"
              placeholder="Valor"
              step="0.01"
              min="0"
              className="border rounded-lg px-3 py-2 text-sm flex-1"
              {...register("valor", { required: true })}
            />

            <select
              className="border rounded-lg px-3 py-2 text-sm flex-1 bg-background"
              {...register("categoria")}
            >

              <option value="alimentação">🍽️ Alimentação</option>
              <option value="decoração">🎀 Decoração</option>
              <option value="música">🎵 Música</option>
              <option value="transporte">🚗 Transporte</option>
              <option value="outros">📦 Outros</option>

            </select>

          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium hover:opacity-90"
          >
            Salvar Gasto
          </button>

        </form>
      )}

      {evento.gastos.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhum gasto registrado ainda.
        </p>
      ) : (
        <div className="space-y-2">

          {evento.gastos.map((g) => (

            <div
              key={g.id}
              className="flex items-center justify-between bg-card border rounded-lg px-4 py-3 hover:bg-muted transition"
            >

              <div>
                <p className="text-sm font-medium text-foreground">
                  {g.titulo}
                </p>

                <p className="text-xs text-muted-foreground">
                  {g.categoria}
                </p>
              </div>

              <span className="text-sm font-bold text-primary">
                R$ {g.valor.toFixed(2)}
              </span>

            </div>

          ))}

          <div className="flex justify-end pt-2 border-t">

            <p className="text-sm font-semibold text-foreground">
              Total: <span className="text-primary">R$ {totalGastos.toFixed(2)}</span>
            </p>

          </div>

        </div>
      )}

    </Card>
  );
};

export default GerenciaEvento;

