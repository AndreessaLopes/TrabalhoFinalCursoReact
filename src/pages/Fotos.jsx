import { useContext } from "react";
import { EventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus } from "lucide-react";

const Fotos = () => {
  const { eventos } = useContext(EventContext);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Fotos</h1>
        <p className="text-sm text-muted-foreground mt-1">Galeria de fotos por evento</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {eventos.map((evento) => (
          <Card
            key={evento.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/dashboard/fotos/${evento.id}`)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{evento.nome}</CardTitle>
            </CardHeader>
            <CardContent>
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

export default Fotos;