import { Link } from "react-router-dom";

/*
  Dashboard hero
  Kullaniciyi selamlar ve oturum durumuna gore hesap aksiyonlarini gosterir.
*/
function DashboardHero({
  currentUser,
  isAccountMenuOpen,
  onToggleAccountMenu,
  onOpenAccountModal,
  onOpenPasswordModal,
  onLogout,
}) {
  return (
    <section className="hero-section">
      <div>
        <h1>Hoşgeldin, {currentUser?.full_name || "Kullanıcı"}!</h1>
        <p>Beslenme ve egzersiz sürecini kontrol et</p>
      </div>

      {currentUser ? (
        <div className="dashboard-account-area">
          <button
            type="button"
            className="sign-in-button dashboard-account-trigger"
            onClick={onToggleAccountMenu}
          >
            <span className="dashboard-account-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="8" r="4" />
              </svg>
            </span>
            <span>{currentUser.full_name?.split(" ")[0] || "Hesabım"}</span>
          </button>

          {isAccountMenuOpen && (
            <div className="dashboard-account-dropdown">
              <button type="button" onClick={onOpenAccountModal}>
                Hesabım
              </button>
              <button type="button" onClick={onLogout}>
                Oturumu Kapat
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="sign-in-button">
          Giriş Yap
        </Link>
      )}
    </section>
  );
}

export default DashboardHero;
