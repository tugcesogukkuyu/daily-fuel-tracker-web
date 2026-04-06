import { useEffect } from "react";
import MealEntryForm from "../../addmeal/components/MealEntryForm";

/*
  Meal entry drawer
  Dashboard uzerinden hizli ogun ekleme panelini saga acilan drawer olarak gosterir.
*/
function MealEntryDrawer({ isOpen, onClose, onSuccess }) {
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
            <h2>Öğün Ekle</h2>
          </div>

          <button
            type="button"
            className="dashboard-drawer-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <MealEntryForm
          mode="drawer"
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      </aside>
    </div>
  );
}

export default MealEntryDrawer;
