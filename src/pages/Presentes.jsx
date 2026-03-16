import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Calendar } from "lucide-react";

const Presentes = () => {
  const { eventos } = useContext(EventContext);
  const navigate = useNavigate();

  return (
    <div className="space-y-8 p-6">

      <div>
        <h1 className="text-2xl font-semibold">Lista de Presentes</h1>
        <p className="text-sm text-muted-foreground">
          Selecione um evento para ver os presentes
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {eventos.map((evento) => (

          <Card
            key={evento.id}
            onClick={() => navigate(`/dashboard/presentes/${evento.id}`)}
            className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all"
          >

            <CardHeader className="pb-2">
              <CardTitle className="text-base">{evento.nome}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">

              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar size={14} />
                {evento.data
                  ? new Date(evento.data + "T00:00:00").toLocaleDateString("pt-BR")
                  : "Sem data"}
              </p>

              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Gift size={14} />
                {evento.presentes?.length || 0} presentes
              </p>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>
  );
};

export default Presentes;