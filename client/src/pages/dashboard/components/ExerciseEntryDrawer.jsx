import { useEffect } from "react";
import ExerciseEntryForm from "../../addexercise/component/ExerciseEntryForm";

/*
  Exercise entry drawer
  Dashboard uzerinden hizli egzersiz ekleme panelini saga acilan drawer olarak gosterir.
*/
function ExerciseEntryDrawer({ isOpen, onClose, onSuccess }) {
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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="dashboard-drawer-overlay" onClick={onClose}>
      <aside
        className="dashboard-drawer-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dashboard-drawer-header">
          <div>
            <span className="dashboard-drawer-kicker">Hızlı Ekleme</span>
            <h2>Egzersiz Ekle</h2>
          </div>

          <button
            type="button"
            className="dashboard-drawer-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <ExerciseEntryForm
          mode="drawer"
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      </aside>
    </div>
  );
}

export default ExerciseEntryDrawer;
