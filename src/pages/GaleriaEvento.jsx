import { useParams } from "react-router-dom";
import { useContext } from "react";
import { EventContext } from "../context/EventContext";

const GaleriaEvento = () => {
    const { eventId } = useParams();
    const { eventos, adicionarFoto } = useContext(EventContext);

    const evento = eventos.find((e) => e.id === Number(eventId));

    if (!evento) return <p>Evento não encontrado</p>;

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        adicionarFoto(evento.id, imageUrl);
    };

    // 🔥 GARANTE QUE NÃO QUEBRE NO PRIMEIRO RENDER
    const todasFotos = [
        ...(evento.fotosApi || []),
        ...(evento.fotosUpload || []),
    ];

    return (
        <div style={{ padding: 30 }}>
        {/* HEADER */}
        <div
            style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            }}
        >
            <div>
            <h2 style={{ margin: 0 }}>{evento.nome}</h2>
            <p style={{ margin: 0, color: "gray" }}>
                {todasFotos.length} foto(s)
            </p>
            </div>

            {/* BOTÃO SEMPRE VISÍVEL */}
            <label
            style={{
                padding: "10px 20px",
                background: "#000",
                color: "#fff",
                borderRadius: 8,
                cursor: "pointer",
            }}
            >
            + Upload de Foto
            <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                hidden
            />
            </label>
        </div>

        {/* SE NÃO TIVER FOTO */}
        {todasFotos.length === 0 && (
            <p style={{ color: "gray" }}>Nenhuma foto ainda</p>
        )}

        {/* GRID */}
        <div
            style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
            }}
        >
            {todasFotos.map((foto, index) => (
            <img
                key={index}
                src={foto}
                alt={`foto-${index}`}
                style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 8,
                }}
            />
            ))}
        </div>
        </div>
    );
};

export default GaleriaEvento;