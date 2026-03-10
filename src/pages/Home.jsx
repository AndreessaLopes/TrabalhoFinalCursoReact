import Sidebar from "../components/Sidebar";

const cardData = [
    {
        title: "Total de Inscritos",
        value: "1.200",
        icon: "👥",
        bgColor: "bg-blue-100",
        textColor: "text-blue-600"
    },
    {
        title: "Ingressos Vendidos",
        value: "850",
        icon: "🎟️",
        bgColor: "bg-green-100",
        textColor: "text-green-600"
    },
    {
        title: "Receita Total",
        value: "R$ 42.500",
        icon: "💰",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-600"
    },
    {
        title: "Lista de Tarefas",
        value: "5 Pendentes",
        icon: "📋",
        bgColor: "bg-red-100",
        textColor: "text-red-600"
    },
]

const Home = () => {
  return (
    <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-gray-600">
        Visão geral de como está o andamento do evento
        </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cardData.map((card) => (
                    <Card key={card.title} className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-[13px] font-medium text-muted-foreground">
                                {card.title}
                            </CardTitle>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                                <card.icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold tracking-tight">
                                {card.value}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
    </div>

    
  );
};

export default Home;
