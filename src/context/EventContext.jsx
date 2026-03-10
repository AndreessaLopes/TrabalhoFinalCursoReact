import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [eventos, setEventos] = useState([
        {
        id: 1,
        nome: "Casamento Ana & Júlia",
        query: "wedding party",
        fotosApi: [],
        fotosUpload: [],
        },
        {
        id: 2,
        nome: "Aniversário 15 anos",
        query: "birthday party",
        fotosApi: [],
        fotosUpload: [],
        },
        {
        id: 3,
        nome: "Chá de panela",
        query: null, // esse NÃO terá fotos da API
        fotosApi: [],
        fotosUpload: [],
        },
    ]);

    // 🔥 BUSCA AUTOMÁTICA NA PEXELS
    useEffect(() => {
        const buscarFotos = async () => {
        const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

        const eventosAtualizados = await Promise.all(
            eventos.map(async (evento) => {
            if (!evento.query) return evento;

            try {
                const response = await fetch(
                `https://api.pexels.com/v1/search?query=${evento.query}&per_page=20`,
                {
                    headers: {
                    Authorization: apiKey,
                    },
                }
                );

                const data = await response.json();

                return {
                ...evento,
                fotosApi: data.photos.map((foto) => foto.src.medium),
                };
            } catch (error) {
                console.error("Erro ao buscar fotos:", error);
                return evento;
            }
            })
        );

        setEventos(eventosAtualizados);
        };

        buscarFotos();
    }, []);

    const adicionarFoto = (eventId, novaFoto) => {
        setEventos((prev) =>
        prev.map((evento) =>
            evento.id === eventId
            ? {
                ...evento,
                fotosUpload: [...evento.fotosUpload, novaFoto],
                }
            : evento
        )
        );
    };

    return (
        <EventContext.Provider value={{ eventos, adicionarFoto }}>
        {children}
        </EventContext.Provider>
    );
};