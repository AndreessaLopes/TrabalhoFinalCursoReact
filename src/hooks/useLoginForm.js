import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [signIn] = useState(() => async (email, password) => {
        // Simulação de autenticação
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (email === "admin@festeja.com" && password === "admin123") {
            return { success: true };
        }
        throw new Error("Credenciais inválidas");
    });

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            setIsLoading(true);
            const result = await signIn(email, password);
            localStorage.setItem("user", JSON.stringify({ email }));
            if (result.success) {
                console.log("Login realizado com sucesso:", { email });
                navigate("/dashboard");
            } else {
                setError("E-mail ou senha inválidos.");
            }
        } catch (err) {
            setError("E-mail ou senha inválidos.");
        } finally {
            setIsLoading(false);
        }
    };


    return {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        toggleShowPassword,
        isLoading,
        error,
        handleSubmit,
    };
}