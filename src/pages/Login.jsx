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

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function Login() {
  const {
    email, setEmail,
    password, setPassword,
    showPassword, toggleShowPassword,
    isLoading, error,
    handleSubmit, handleGoogleLogin,
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
          <h2 className="login-title__heading">Bem-vindo de volta</h2>
          <p className="login-title__sub">Entre na sua conta para acessar seu evento</p>
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
            <span className="login-divider__text">ou continue com</span>
            <div className="login-divider__line" />
          </div>

          {/* Google */}
          <div className="login-google">
            <button
              type="button"
              className="login-google__btn"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <GoogleIcon />
              Entrar com Google
            </button>
          </div>
        </form>

        {/* Cadastro */}
        <p className="login-signup">
          Não tem uma conta?{" "}
          <button type="button" className="login-signup__btn">
            Crie seu evento agora
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
