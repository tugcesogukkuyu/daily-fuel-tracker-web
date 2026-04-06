import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

/*
  Register page
  Yeni kullanici kaydi olusturur ve basariliysa giris sayfasina yonlendirir.
*/
function RegisterPage() {
  /*
    Page state
    Form alanlarini ve hata mesajlarini tutar.
  */
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  /*
    Handle register submit
    Form verisini kontrol eder, backend'e kayit istegi gonderir ve basariliysa giris sayfasina yonlendirir.
  */
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setIsErrorMessage(true);
      setFeedbackMessage("Şifreler eşleşmiyor.");
      return;
    }

    try {
      setIsSubmitting(true);

      await registerUser({
        fullName,
        email,
        password,
      });

      setIsErrorMessage(false);
      setFeedbackMessage("Hesabın oluşturuldu. Giriş ekranına yönlendiriliyorsun...");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 900);
    } catch (error) {
      setIsErrorMessage(true);
      setFeedbackMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-icon">+</div>
        <h1>Hesap Oluştur</h1>
        <p>Günlük takibini başlat</p>

        <form className="auth-form" onSubmit={handleRegisterSubmit}>
          <label>Ad Soyad</label>
          <input
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />

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

          <label>Şifre Tekrar</label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          {feedbackMessage && (
            <p className={isErrorMessage ? "auth-error-message" : "auth-success-message"}>
              {feedbackMessage}
            </p>
          )}

          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? "Oluşturuluyor..." : "Hesap Oluştur"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Zaten hesabın var mı? </span>
          <Link to="/login" className="auth-link">
            Giriş Yap
          </Link>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;
