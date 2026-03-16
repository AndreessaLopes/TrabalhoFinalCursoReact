import { useContext } from "react";
import { EventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus } from "lucide-react";

const Fotos = () => {
  const { eventos } = useContext(EventContext);
  const navigate = useNavigate();

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">

      {/* TÍTULO */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Galeria de Fotos</h1>
        <p className="text-muted-foreground mt-1">
          Explore e compartilhe fotos dos eventos
        </p>
      </div>

      {/* GRID DE EVENTOS */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {eventos.map((evento) => {
          const totalFotos =
            (evento.fotosApi?.length || 0) +
            (evento.fotosUpload?.length || 0);

          const cover =
            evento.fotosUpload?.[0] ||
            evento.fotosApi?.[0] ||
            "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg";

          return (
            <Card
              key={evento.id}
              onClick={() => navigate(`/dashboard/fotos/${evento.id}`)}
              className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* IMAGEM DO EVENTO */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={cover}
                  alt={evento.nome}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{evento.nome}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <ImagePlus size={16} />
                  {totalFotos} foto{totalFotos !== 1 && "s"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Fotos;
