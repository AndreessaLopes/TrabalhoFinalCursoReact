import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventos, setEventos] = useState(() => {
    const salvo = localStorage.getItem("eventos");
    return salvo ? JSON.parse(salvo) : [
      { id: 1, nome: "Casamento Ana & Júlia", data: "2025-06-15", query: "wedding party", fotosApi: [], fotosUpload: [], convidados: [], gastos: [], presentes: [] },
      { id: 2, nome: "Aniversário 15 anos", data: "2025-08-20", query: "birthday party", fotosApi: [], fotosUpload: [], convidados: [], gastos: [], presentes: [] },
      { id: 3, nome: "Chá de panela", data: "2025-09-10", query: "kitchen party bridal shower", fotosApi: [], fotosUpload: [], convidados: [], gastos: [], presentes: [] },
    ];
  });

  // Salva no localStorage sempre que eventos mudar
  useEffect(() => {
    localStorage.setItem("eventos", JSON.stringify(eventos));
  }, [eventos]);

  // Busca fotos sem sobrescrever dados existentes
  useEffect(() => {
    const buscarFotos = async () => {
      const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

      const eventosAtualizados = await Promise.all(
        eventos.map(async (evento) => {
          if (!evento.query || evento.fotosApi.length > 0) return evento;
          try {
            const response = await fetch(
              `https://api.pexels.com/v1/search?query=${evento.query}&per_page=20`,
              { headers: { Authorization: apiKey } }
            );
            const data = await response.json();
            return { ...evento, fotosApi: data.photos.map((f) => f.src.medium) };
          } catch {
            return evento;
          }
        })
      );

      // ✅ Só atualiza fotosApi, preserva presentes/convidados/gastos
      setEventos((prevEventos) =>
        prevEventos.map((eventoAtual) => {
          const atualizado = eventosAtualizados.find((e) => e.id === eventoAtual.id);
          return atualizado
            ? { ...eventoAtual, fotosApi: atualizado.fotosApi }
            : eventoAtual;
        })
      );
    };

    buscarFotos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const adicionarFoto = (eventId, novaFoto) => {
    setEventos((prev) =>
      prev.map((evento) =>
        evento.id === eventId
          ? { ...evento, fotosUpload: [...evento.fotosUpload, novaFoto] }
          : evento
      )
    );
  };

  const adicionarConvidado = (eventId, nome) => {
    setEventos((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, convidados: [...e.convidados, { id: Date.now(), nome, confirmado: false }] }
          : e
      )
    );
  };

  const toggleConfirmado = (eventId, convidadoId) => {
    setEventos((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              convidados: e.convidados.map((c) =>
                c.id === convidadoId ? { ...c, confirmado: !c.confirmado } : c
              ),
            }
          : e
      )
    );
  };

  const adicionarGasto = (eventId, titulo, valor, categoria) => {
    setEventos((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, gastos: [...e.gastos, { id: Date.now(), titulo, valor: Number(valor), categoria }] }
          : e
      )
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
      presentes: [],
    };
    setEventos((prev) => [...prev, novoEvento]);
  };

  const removerEvento = (eventId) => {
    setEventos((prev) => prev.filter((evento) => evento.id !== eventId));
  };

  const removerFoto = (eventId, fotoIndex) => {
    setEventos((prev) =>
      prev.map((evento) => {
        if (evento.id !== eventId) return evento;
        const todasFotos = [...(evento.fotosApi || []), ...(evento.fotosUpload || [])];
        todasFotos.splice(fotoIndex, 1);
        return { ...evento, fotosApi: [], fotosUpload: todasFotos };
      })
    );
  };

  const adicionarPresente = (eventId, nomePresente) => {
    setEventos((prev) =>
      prev.map((evento) =>
        evento.id === eventId
          ? { ...evento, presentes: [...(evento.presentes || []), { id: Date.now(), nome: nomePresente }] }
          : evento
      )
    );
  };

  const removerPresente = (eventId, presenteId) => {
    setEventos((prev) =>
      prev.map((evento) =>
        evento.id === eventId
          ? { ...evento, presentes: evento.presentes.filter((p) => p.id !== presenteId) }
          : evento
      )
    );
  };

  return (
    <EventContext.Provider
      value={{
        eventos,
        adicionarFoto,
        criarEvento,
        removerEvento,
        adicionarConvidado,
        toggleConfirmado,
        adicionarGasto,
        removerFoto,
        adicionarPresente,
        removerPresente,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};