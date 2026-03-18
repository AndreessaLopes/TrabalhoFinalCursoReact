import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function useRegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ← react-hook-form entra aqui
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const signIn = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (email === "admin@festeja.com" && password === "admin123") {
      return { success: true };
    }
    throw new Error("Credenciais inválidas");
  };

  const onSubmit = async (data) => {
    setError("");
    try {
      setIsLoading(true);
      await signIn(data.email, data.password);
      login(data.email);
      navigate("/dashboard");
    } catch {
      setError("E-mail ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,                            // ← novo
    handleSubmit: handleSubmit(onSubmit), // ← novo
    errors,                              // ← novo
    showPassword,
    toggleShowPassword,
    isLoading,
    error,
  };
}