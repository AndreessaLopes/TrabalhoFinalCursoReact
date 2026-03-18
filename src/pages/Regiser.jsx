import "./register.css";
import { useRegisterForm } from "../hooks/useRegisterForm";

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  color: i % 2 === 0 ? "#c9a84c" : "#e8729a",
  opacity: 0.4 + Math.random() * 0.4,
  duration: `${3 + Math.random() * 4}s`,
  delay: `${Math.random() * 3}s`,
}));

export default function Register() {
  const { register, handleSubmit, errors, showPassword, isLoading, error } =
    useRegisterForm();

  return (
    <div className="register-page">
      {/* Blobs decorativos */}
      <div className="register-blob register-blob--gold" aria-hidden="true" />
      <div className="register-blob register-blob--rose" aria-hidden="true" />
      <div className="register-blob register-blob--center" aria-hidden="true" />

      {/* Partículas */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="register-particle"
          aria-hidden="true"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: p.color,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Card principal */}
      <main className="register-card">
        {/* Logo */}
        <div className="register-logo">
          <div className="register-logo__wrapper">
            <span className="register-logo__icon" aria-hidden="true">
              🎉
            </span>
            <h1 className="register-logo__name">festeja</h1>
          </div>
          <p className="register-logo__tagline">seu evento, sua memória</p>
        </div>

        {/* Título */}
        <div className="register-title">
          <h2 className="register-title__heading">Crie sua conta</h2>
          <p className="register-title__sub">
            Cadastre-se para acessar seu evento.
          </p>
        </div>

        {/* Formulário */}
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {/* E-mail */}
          <div className="register-field">
            <label className="register-field__label" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="register-field__input"
              placeholder="seuemail@exemplo.com"
              autoComplete="email"
              {...register("email", {
                required: "E-mail obrigatório",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "E-mail inválido",
                },
              })}
            />
            {errors.email && (
              <p className="register-error" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Senha */}
          <div className="register-field register-field--password">
            <label className="register-field__label" htmlFor="password">
              Senha
            </label>
            <div className="register-field__input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="register-field__input register-field__input--password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register("password", {
                  required: "Senha obrigatória",
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 caracteres",
                  },
                })}
              />
              {errors.password && (
                <p className="register-error" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          

          {/* Esqueceu a senha */}
          <div className="register-forgot">
            <button type="button" className="register-forgot__btn">
              Esqueceu a senha?
            </button>
          </div>

          {/* Erro */}
          {error && (
            <p className="register-error" role="alert">
              {error}
            </p>
          )}

          {/* Submit */}
          <div className="register-submit">
            <button
              type="submit"
              disabled={isLoading}
              className={`register-submit__btn ${isLoading ? "register-submit__btn--loading" : ""}`}
            >
              {isLoading ? "Entrando..." : "Entrar no Festeja"}
            </button>
          </div>

          {/* Divisor */}
          <div className="register-divider" aria-hidden="true">
            <div className="register-divider__line" />
            <div className="register-divider__line" />
          </div>
        </form>

        <p className="register-signup">
          Já possui uma conta?{" "}
          <button onClick={() => window.location.href = "/login"}
          type="button" className="register-signup__btn">
            Faça login agora
          </button>
        </p>

        {/* Pills de funcionalidades */}
        <div className="register-features" aria-label="Funcionalidades do Festeja">
          {["🎁 Presentes", "📸 Fotos", "💰 Gastos"].map((tag) => (
            <span key={tag} className="register-features__pill">
              {tag}
            </span>
          ))}
        </div>
      </main>
    </div>
  );
}
