import "./login.css";
import { useLoginForm } from "../hooks/useLoginForm";

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

export default function Login() {
  const {
    email, setEmail,
    password, setPassword,
    showPassword, toggleShowPassword,
    isLoading, error,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="login-page">

      {/* Blobs decorativos */}
      <div className="login-blob login-blob--gold" aria-hidden="true" />
      <div className="login-blob login-blob--rose" aria-hidden="true" />
      <div className="login-blob login-blob--center" aria-hidden="true" />

      {/* Partículas */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="login-particle"
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
      <main className="login-card">

        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo__wrapper">
            <span className="login-logo__icon" aria-hidden="true">🎉</span>
            <h1 className="login-logo__name">festeja</h1>
          </div>
          <p className="login-logo__tagline">seu evento, sua memória</p>
        </div>

        {/* Título */}
        <div className="login-title">
          <h2 className="login-title__heading">Bem-vindo de volta!</h2>
          <p className="login-title__sub">Entre na sua conta para acessar seu evento.</p>
        </div>

        {/* Formulário */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>

          {/* E-mail */}
          <div className="login-field">
            <label className="login-field__label" htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className="login-field__input"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          {/* Senha */}
          <div className="login-field login-field--password">
            <label className="login-field__label" htmlFor="password">Senha</label>
            <div className="login-field__input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="login-field__input login-field__input--password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="login-field__toggle-btn"
                onClick={toggleShowPassword}
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Esqueceu a senha */}
          <div className="login-forgot">
            <button type="button" className="login-forgot__btn">
              Esqueceu a senha?
            </button>
          </div>

          {/* Erro */}
          {error && <p className="login-error" role="alert">{error}</p>}

          {/* Submit */}
          <div className="login-submit">
            <button
              type="submit"
              className="login-submit__btn"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar no Festeja"}
            </button>
          </div>

          {/* Divisor */}
          <div className="login-divider" aria-hidden="true">
            <div className="login-divider__line" />
            <div className="login-divider__line" />
          </div>
        </form>

        {/* Cadastro */}
        <p className="login-signup">
          Não tem uma conta?{" "}
          <button type="button" className="login-signup__btn">
            Crie sua conta agora
          </button>
        </p>

        {/* Pills de funcionalidades */}
        <div className="login-features" aria-label="Funcionalidades do Festeja">
          {["🎁 Presentes", "📸 Fotos", "💰 Gastos"].map((tag) => (
            <span key={tag} className="login-features__pill">{tag}</span>
          ))}
        </div>

      </main>
    </div>
  );
}
