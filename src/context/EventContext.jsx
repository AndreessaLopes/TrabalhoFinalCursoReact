import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventos, setEventos] = useState([
    {
      id: 1,
      nome: "Casamento Ana & Júlia",
      data: "2025-06-15",
      query: "wedding party",
      fotosApi: [],
      fotosUpload: [],
      convidados: [],
      gastos: [],
    },
    {
      id: 2,
      nome: "Aniversário 15 anos",
      data: "2025-08-20",
      query: "birthday party",
      fotosApi: [],
      fotosUpload: [],
      convidados: [],
      gastos: [],
    },
    {
      id: 3,
      nome: "Chá de panela",
      data: "2025-09-10",
      query: "kitchen party bridal shower",
      fotosApi: [],
      fotosUpload: [],
      convidados: [],
      gastos: [],
    },
  ]);

  useEffect(() => {
    const buscarFotos = async () => {
      const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

      const eventosAtualizados = await Promise.all(
        eventos.map(async (evento) => {
          if (!evento.query || evento.fotosApi.length > 0) return evento;
          try {
            const response = await fetch(
              `https://api.pexels.com/v1/search?query=${evento.query}&per_page=20`,
              { headers: { Authorization: apiKey } },
            );
            const data = await response.json();
            return {
              ...evento,
              fotosApi: data.photos.map((f) => f.src.medium),
            };
          } catch {
            return evento;
          }
        }),
      );

      setEventos(eventosAtualizados);
    };

    buscarFotos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const adicionarFoto = (eventId, novaFoto) => {
    setEventos((prev) =>
      prev.map((evento) =>
        evento.id === eventId
          ? {
              ...evento,
              fotosUpload: [...evento.fotosUpload, novaFoto],
            }
          : evento,
      ),
    );
  };

  const adicionarConvidado = (eventId, nome) => {
    setEventos((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              convidados: [
                ...e.convidados,
                { id: Date.now(), nome, confirmado: false },
              ],
            }
          : e,
      ),
    );
  };

  const toggleConfirmado = (eventId, convidadoId) => {
    setEventos((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              convidados: e.convidados.map((c) =>
                c.id === convidadoId ? { ...c, confirmado: !c.confirmado } : c,
              ),
            }
          : e,
      ),
    );
  };

  const adicionarGasto = (eventId, titulo, valor, categoria) => {
    setEventos((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              gastos: [
                ...e.gastos,
                { id: Date.now(), titulo, valor: Number(valor), categoria },
              ],
            }
          : e,
      ),
    );
  };

  const criarEvento = (nome, data) => {
    const novoEvento = {
      id: Date.now(),
      nome,
      data,
      query: nome,
      fotosApi: [],
      fotosUpload: [],
      convidados: [],
      gastos: [],
    };
    setEventos((prev) => [...prev, novoEvento]);
  };

  return (
    <EventContext.Provider
      value={{
        eventos,
        adicionarFoto,
        criarEvento, 
        adicionarConvidado, 
        toggleConfirmado, 
        adicionarGasto, 
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
