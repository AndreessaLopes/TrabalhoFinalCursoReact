import { useContext } from "react";
import { EventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";

const Fotos = () => {
  const { eventos } = useContext(EventContext);
  const navigate = useNavigate();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap:20 }}>
      {eventos.map((evento) => (
        <div
          key={evento.id}
          onClick={() => navigate(`/dashboard/fotos/${evento.id}`)}
          style={{
            padding: 20,
            border: "1px solid #ddd",
            borderRadius: 12,
            cursor: "pointer",
            backgroundColor: "white",
          }}
        >
          <h3>{evento.nome}</h3>
          <p>
            📸 {evento.fotosApi.length + evento.fotosUpload.length} fotos
          </p>

        </div>
      ))}
    </div>
  );
};

export default Fotos;