import { useEffect, useState } from "react";
import {
  deleteAuthenticatedUserAccount,
  updateAuthenticatedUserPassword,
} from "../../../services/authService";

/*
  Dashboard account modal
  Kullanici bilgisi, sifre degistirme ve hesap silme alanlarini kompakt accordion yapisinda sunar.
*/
function DashboardAccountModal({
  isOpen,
  currentUser,
  initialView = "account",
  onClose,
  onPasswordChanged,
  onAccountDeleted,
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setDeletePassword("");
      setFeedbackMessage("");
      setIsErrorMessage(false);
      setExpandedSection(null);
      return;
    }

    if (initialView === "password") {
      setExpandedSection("password");
      return;
    }

    setExpandedSection(null);
  }, [isOpen, initialView]);

  if (!isOpen) {
    return null;
  }

  const toggleSection = (sectionName) => {
    setExpandedSection((currentSection) =>
      currentSection === sectionName ? null : sectionName
    );
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setIsErrorMessage(true);
      setFeedbackMessage("Tüm şifre alanlarını doldurmalısın.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setIsErrorMessage(true);
      setFeedbackMessage("Yeni şifre alanları birbiriyle eşleşmiyor.");
      return;
    }

    try {
      setIsUpdatingPassword(true);

      const response = await updateAuthenticatedUserPassword({
        currentPassword,
        newPassword,
      });

      setIsErrorMessage(false);
      setFeedbackMessage(response.message || "Şifre başarıyla güncellendi.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setExpandedSection(null);

      if (onPasswordChanged) {
        onPasswordChanged();
      }
    } catch (error) {
      setIsErrorMessage(true);
      setFeedbackMessage(error.message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setIsErrorMessage(true);
      setFeedbackMessage("Hesabı silmek için mevcut şifreni girmelisin.");
      return;
    }

    try {
      setIsDeletingAccount(true);

      const response = await deleteAuthenticatedUserAccount({
        currentPassword: deletePassword,
      });

      if (onAccountDeleted) {
        onAccountDeleted(response.message || "Hesap başarıyla silindi.");
      }
    } catch (error) {
      setIsErrorMessage(true);
      setFeedbackMessage(error.message);
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="account-modal-overlay" onClick={onClose}>
      <section
        className="account-modal-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="account-modal-header">
          <div>
            <span className="dashboard-drawer-kicker">Hesap</span>
            <h2>Hesabım</h2>
          </div>

          <button
            type="button"
            className="dashboard-drawer-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="account-user-summary">
          <strong>{currentUser?.full_name || "Kullanıcı"}</strong>
          <span>{currentUser?.email || "-"}</span>
        </div>

        {feedbackMessage && (
          <p className={isErrorMessage ? "auth-error-message" : "auth-success-message"}>
            {feedbackMessage}
          </p>
        )}

        <div className="account-accordion-list">
          <section className="account-accordion-card">
            <button
              type="button"
              className="account-accordion-trigger"
              onClick={() => toggleSection("password")}
            >
              <span>Şifreyi Değiştir</span>
              <strong>{expandedSection === "password" ? "−" : "+"}</strong>
            </button>

            {expandedSection === "password" && (
              <form className="account-password-form" onSubmit={handlePasswordSubmit}>
                <label>
                  Mevcut Şifre
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                  />
                </label>

                <label>
                  Yeni Şifre
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </label>

                <label>
                  Yeni Şifre Tekrar
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </label>

                <button
                  type="submit"
                  className="dashboard-action-button account-primary-button"
                  disabled={isUpdatingPassword}
                >
                  {isUpdatingPassword ? "Güncelleniyor..." : "Şifreyi Güncelle"}
                </button>
              </form>
            )}
          </section>

          <section className="account-accordion-card account-danger-zone">
            <button
              type="button"
              className="account-accordion-trigger account-danger-trigger"
              onClick={() => toggleSection("delete")}
            >
              <span>Hesabı Sil</span>
              <strong>{expandedSection === "delete" ? "−" : "+"}</strong>
            </button>

            {expandedSection === "delete" && (
              <div className="account-delete-panel">
                <p>Bu işlem kullanıcı hesabını ve bağlı tüm kayıtları kalıcı olarak siler.</p>

                <label>
                  Mevcut Şifre
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={(event) => setDeletePassword(event.target.value)}
                  />
                </label>

                <button
                  type="button"
                  className="account-danger-button"
                  onClick={handleDeleteAccount}
                  disabled={isDeletingAccount}
                >
                  {isDeletingAccount ? "Siliniyor..." : "Hesabı Sil"}
                </button>
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}

export default DashboardAccountModal;
