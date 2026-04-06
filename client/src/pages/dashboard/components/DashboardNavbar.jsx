import { Link } from "react-router-dom";
import { DASHBOARD_NAV_ITEMS } from "../constants/dashboardData";

/*
  Dashboard navbar
  Ana gezinme baglantilarini gosterir; iki aksiyon linki drawer acar.
*/
function DashboardNavbar({ onOpenMealDrawer, onOpenExerciseDrawer }) {
  return (
    <nav className="dashboard-navbar">
      {DASHBOARD_NAV_ITEMS.map((navItem) => {
        if (navItem.label === "Öğün Ekle") {
          return (
            <button
              key={navItem.to}
              type="button"
              className={`nav-item ${navItem.isActive ? "active-nav-item" : ""}`}
              onClick={onOpenMealDrawer}
            >
              {navItem.label}
            </button>
          );
        }

        if (navItem.label === "Egzersiz Ekle") {
          return (
            <button
              key={navItem.to}
              type="button"
              className={`nav-item ${navItem.isActive ? "active-nav-item" : ""}`}
              onClick={onOpenExerciseDrawer}
            >
              {navItem.label}
            </button>
          );
        }

        return (
          <Link
            key={navItem.to}
            to={navItem.to}
            className={`nav-item ${navItem.isActive ? "active-nav-item" : ""}`}
          >
            {navItem.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default DashboardNavbar;
