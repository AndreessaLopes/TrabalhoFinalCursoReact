import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ImagePlus, ArrowRight } from "lucide-react";

const Home = () => {
  const { eventos } = useContext(EventContext);
  const navigate = useNavigate();

  const totalFotos = eventos.reduce(
    (acc, e) => acc + (e.fotosApi?.length ?? 0) + (e.fotosUpload?.length ?? 0),
    0,
  );

  return (
    <div className="space-y-6 p-6">
      {/* Boas-vindas */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Bem-vindo ao Festeja!
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Veja um resumo dos seus eventos
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total de Eventos
            </CardTitle>
            <Calendar size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{eventos.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total de Fotos
            </CardTitle>
            <ImagePlus size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalFotos}</p>
          </CardContent>
        </Card>
      </div>

      {/* Eventos recentes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">
            Eventos recentes
          </h2>
          <button
            onClick={() => navigate("/dashboard/event")}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            Ver todos <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {eventos.slice(0, 3).map((evento) => (
            <Card
              key={evento.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/dashboard/event/${evento.id}`)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {evento.nome}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar size={12} />
                  {evento.data
                    ? new Date(evento.data + "T00:00:00").toLocaleDateString(
                        "pt-BR",
                      )
                    : "Sem data"}
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <ImagePlus size={12} />
                  {(evento.fotosApi?.length ?? 0) +
                    (evento.fotosUpload?.length ?? 0)}{" "}
                  fotos
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
