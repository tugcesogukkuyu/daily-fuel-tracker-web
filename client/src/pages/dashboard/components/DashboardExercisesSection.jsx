import { Link } from "react-router-dom";

/*
  Dashboard exercises section
  Secili gunun en fazla uc egzersiz kaydini dashboard kartinda gosterir.
*/
function DashboardExercisesSection({
  exercises,
  onOpenExerciseDrawer,
  selectedDateKey,
}) {
  const visibleExercises = exercises.slice(0, 3);
  const exerciseHistoryPath = `/add-exercise?date=${selectedDateKey}`;

  return (
    <section className="exercise-section dashboard-flow-card">
      <div className="section-top">
        <h2>
          Bugünkü
          <span>Egzersizler</span>
        </h2>
        <button
          type="button"
          className="section-link dashboard-action-button"
          onClick={onOpenExerciseDrawer}
        >
          Egzersiz Ekle
        </button>
      </div>

      <div className="dashboard-flow-body">
        {visibleExercises.length === 0 && (
          <div className="dashboard-empty-state">
            <p className="empty-section-message">Bugün için egzersiz kaydı yok.</p>
            <span>Eklediğin ilk üç egzersiz burada görünecek.</span>
          </div>
        )}

        {visibleExercises.length > 0 && (
          <div className="dashboard-record-list dashboard-record-list-fixed">
            {visibleExercises.map((exercise) => (
              <article key={exercise.id} className="exercise-item dashboard-record-card">
                <div className="dashboard-record-copy">
                  <h3>{exercise.name}</h3>
                  <p>{exercise.durationMinutes} dk</p>
                </div>

                <div className="exercise-meta dashboard-record-meta">
                  <strong>{exercise.calories} Kal</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-flow-footer dashboard-flow-footer-end">
        <Link to={exerciseHistoryPath} className="dashboard-view-all-button">
          Tümünü Gör
        </Link>
      </div>
    </section>
  );
}

export default DashboardExercisesSection;
