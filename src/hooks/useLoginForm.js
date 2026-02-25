import { useState } from "react";

export function useLoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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
            // Substituir aqui pela chamada
            // ex: await signIn(email, password)
            await new Promise((resolve) => setTimeout(resolve, 1500)); // simulação
            console.log("Login realizado:", { email });
        } catch (err) {
            setError("E-mail ou senha inválidos.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            // Substitua aqui pela sua chamada real de login com Google
            // ex: await signInWithGoogle()
            await new Promise((resolve) => setTimeout(resolve, 1000)); // simulação
            console.log("Login com Google realizado");
        } catch (err) {
            setError("Erro ao entrar com o Google.");
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
        handleGoogleLogin,
    };
}