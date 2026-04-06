import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuthenticatedUser } from "../../services/authService";
import { deleteExercise, getExercises } from "../../services/exerciseService";

/*
  Local date key formatter
  Kayit tarihini UTC kaymasi olmadan secili gun ile karsilastirmak icin kullaniriz.
*/
function formatLocalDateKey(dateValue) {
  const date = new Date(dateValue);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/*
  Exercise date formatter
  Liste ekraninda egzersiz kaydinin tarih bilgisini okunabilir sekilde gosterir.
*/
function formatExerciseDate(dateString) {
  const exerciseDate = new Date(dateString);

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(exerciseDate);
}

/*
  Exercise history page
  Dashboard'daki secili tarihe ait tum egzersiz kayitlarini listeler.
*/
function AddExercisePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get("date");
  const dashboardPath = selectedDate ? `/?date=${selectedDate}` : "/";

  /*
    Exercise history loader
    Giris yapan kullanicinin tum kayitlarini alir ve secili tarih varsa ona gore filtreler.
  */
  const loadExerciseHistory = async () => {
    try {
      const authenticatedUserResponse = await getAuthenticatedUser();
      const authenticatedUser = authenticatedUserResponse.data;
      const exerciseResponse = await getExercises();

      const currentUserExercises = (exerciseResponse.data ?? [])
        .filter((exercise) => {
          if (exercise.user_id !== authenticatedUser.id) {
            return false;
          }

          if (!selectedDate) {
            return true;
          }

          const exerciseDate = formatLocalDateKey(exercise.created_at);

          return exerciseDate === selectedDate;
        })
        .sort((firstExercise, secondExercise) => {
          return new Date(secondExercise.created_at) - new Date(firstExercise.created_at);
        });

      setCurrentUser(authenticatedUser);
      setExerciseRecords(currentUserExercises);
    } catch (error) {
      setCurrentUser(null);
      setExerciseRecords([]);
      setIsErrorMessage(true);
      setFeedbackMessage(error.message);
    }
  };

  useEffect(() => {
    loadExerciseHistory();
  }, [selectedDate]);

  const totalCalories = useMemo(() => {
    return exerciseRecords.reduce(
      (calorieTotal, exercise) => calorieTotal + exercise.calories_burned,
      0
    );
  }, [exerciseRecords]);

  /*
    Delete handler
    Secili listedeki kaydi siler ve ayni tarih filtresiyle listeyi yeniler.
  */
  const handleDeleteExercise = async (exerciseId) => {
    try {
      await deleteExercise(exerciseId);
      setIsErrorMessage(false);
      setFeedbackMessage("Egzersiz kaydı silindi.");
      await loadExerciseHistory();
    } catch (error) {
      setIsErrorMessage(true);
      setFeedbackMessage(error.message);
    }
  };

  return (
    <main className="page-shell">
      <section className="page-card meal-history-page-card">
        <div className="page-header meal-history-header">
          <div className="meal-history-header-copy">
            <Link to={dashboardPath} className="back-button">
              ←
            </Link>

            <div>
              <h1>Tüm Egzersizler</h1>
              <p>
                {selectedDate
                  ? `${selectedDate} tarihli kayıtlar`
                  : currentUser
                    ? `${currentUser.full_name || "Kullanıcı"} için kayıt geçmişi`
                    : "Egzersiz kayıt geçmişi"}
              </p>
            </div>
          </div>

          <Link to={dashboardPath} className="dashboard-action-button meal-history-back-link">
            Gösterge Paneli
          </Link>
        </div>

        <section className="meal-history-summary-card">
          <div>
            <span className="card-label">Toplam Kayıt</span>
            <h2>{exerciseRecords.length}</h2>
          </div>

          <div>
            <span className="card-label">Toplam Yakılan Kalori</span>
            <h2>{totalCalories} Kal</h2>
          </div>
        </section>

        {feedbackMessage && (
          <p className={isErrorMessage ? "auth-error-message" : "auth-success-message"}>
            {feedbackMessage}
          </p>
        )}

        <section className="meal-history-list">
          {exerciseRecords.length === 0 && (
            <div className="meal-history-empty-card">
              <h3>Bu tarihte egzersiz kaydı yok.</h3>
              <p>Dashboard üzerindeki hızlı ekleme panelinden yeni egzersiz ekleyebilirsin.</p>
            </div>
          )}

          {exerciseRecords.map((exercise) => (
            <article key={exercise.id} className="meal-history-item-card">
              <div className="meal-history-item-main">
                <div>
                  <span className="meal-history-type-chip">{exercise.name}</span>
                  <h3>{exercise.name}</h3>
                  <p>{formatExerciseDate(exercise.created_at)}</p>
                </div>

                <strong>{exercise.calories_burned} Kal</strong>
              </div>

              <div className="meal-history-macros-row">
                <span>{exercise.duration_minutes} dk</span>
              </div>

              <div className="meal-history-item-actions">
                <button
                  type="button"
                  className="item-delete-button meal-history-delete-button"
                  onClick={() => handleDeleteExercise(exercise.id)}
                >
                  Kaydı Sil
                </button>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

export default AddExercisePage;
