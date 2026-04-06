import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

/*
  Login page
  Kullanici girisini backend ile dogrular ve dashboard'a yonlendirir.
*/
function LoginPage() {
  /*
    Page state
    Form alanlarini ve hata mesajini tutar.
  */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  const navigate = useNavigate();

  /*
    Handle login submit
    Giris formunu backend'e gonderir ve basariliysa ana sayfaya yonlendirir.
  */
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      await loginUser({
        email,
        password,
      });

      setFeedbackMessage("");
      setIsErrorMessage(false);
      navigate("/", { replace: true });
    } catch (error) {
      setIsErrorMessage(true);
      setFeedbackMessage(error.message);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-icon">+</div>
        <h1>Hoşgeldin</h1>
        <p>Günlük takibini sürdürmek için giriş yap</p>

        <form className="auth-form" onSubmit={handleLoginSubmit}>
          <label>E-posta</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Şifre</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {feedbackMessage && (
            <p className={isErrorMessage ? "auth-error-message" : "auth-success-message"}>
              {feedbackMessage}
            </p>
          )}

          <button type="submit" className="auth-button">
            Giriş Yap
          </button>
        </form>

        <div className="auth-footer">
          <span>Hesabın yok mu? </span>
          <Link to="/register" className="auth-link">
            Kayıt Ol
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
