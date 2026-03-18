import { Link } from "react-router-dom";
const LogOut = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold mb-4">Você saiu da sua conta</h1>
        <p className="text-sm text-muted-foreground mb-6">Esperamos vê-lo novamente em breve!</p>
        <Link to="/login" className="bg-primary text-black px-4 py-2 rounded-lg hover:opacity-90">
          Voltar para Login
        </Link>
    </div>
  );
}

export default LogOut;