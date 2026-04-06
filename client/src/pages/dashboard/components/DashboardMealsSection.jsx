import { Link } from "react-router-dom";

/*
  Dashboard meals section
  Secili gunun en fazla uc ogun kaydini dashboard kartinda gosterir.
*/
function DashboardMealsSection({ meals, onOpenMealDrawer, selectedDateKey }) {
  const visibleMeals = meals.slice(0, 3);
  const mealHistoryPath = `/add-meal?date=${selectedDateKey}`;

  return (
    <section className="meals-section dashboard-flow-card">
      <div className="section-top">
        <h2>
          Bugünkü
          <span>Öğünler</span>
        </h2>
        <button
          type="button"
          className="section-link dashboard-action-button"
          onClick={onOpenMealDrawer}
        >
          Öğün Ekle
        </button>
      </div>

      <div className="dashboard-flow-body">
        {visibleMeals.length === 0 && (
          <div className="dashboard-empty-state">
            <p className="empty-section-message">Bugün için öğün kaydı yok.</p>
            <span>Eklediğin ilk üç öğün burada görünecek.</span>
          </div>
        )}

        {visibleMeals.length > 0 && (
          <div className="dashboard-record-list dashboard-record-list-fixed">
            {visibleMeals.map((meal) => (
              <article key={meal.id} className="meal-item dashboard-record-card">
                <div className="dashboard-record-copy">
                  <h3>{meal.name}</h3>
                  <p>
                    {meal.protein}g Protein | {meal.carbs}g Karbonhidrat | {meal.fat}g Yağ
                  </p>
                </div>

                <div className="meal-meta dashboard-record-meta">
                  <strong>{meal.calories} Kal</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-flow-footer dashboard-flow-footer-end">
        <Link to={mealHistoryPath} className="dashboard-view-all-button">
          Tümünü Gör
        </Link>
      </div>
    </section>
  );
}

export default DashboardMealsSection;
