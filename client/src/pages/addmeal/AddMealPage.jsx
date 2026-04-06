import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuthenticatedUser } from "../../services/authService";
import { deleteMeal, getMeals } from "../../services/mealService";

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
  Meal date formatter
  Liste ekraninda ogun kaydinin tarih bilgisini okunabilir sekilde gosterir.
*/
function formatMealDate(dateString) {
  const mealDate = new Date(dateString);

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(mealDate);
}

/*
  Meal history page
  Dashboard'daki secili tarihe ait tum ogun kayitlarini listeler.
*/
function AddMealPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [mealRecords, setMealRecords] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get("date");
  const dashboardPath = selectedDate ? `/?date=${selectedDate}` : "/";

  /*
    Meal history loader
    Giris yapan kullanicinin tum kayitlarini alir ve secili tarih varsa ona gore filtreler.
  */
  const loadMealHistory = async () => {
    try {
      const authenticatedUserResponse = await getAuthenticatedUser();
      const authenticatedUser = authenticatedUserResponse.data;
      const mealResponse = await getMeals();

      const currentUserMeals = (mealResponse.data ?? [])
        .filter((meal) => {
          if (meal.user_id !== authenticatedUser.id) {
            return false;
          }

          if (!selectedDate) {
            return true;
          }

          const mealDate = formatLocalDateKey(meal.created_at);

          return mealDate === selectedDate;
        })
        .sort((firstMeal, secondMeal) => {
          return new Date(secondMeal.created_at) - new Date(firstMeal.created_at);
        });

      setCurrentUser(authenticatedUser);
      setMealRecords(currentUserMeals);
    } catch (error) {
      setCurrentUser(null);
      setMealRecords([]);
      setIsErrorMessage(true);
      setFeedbackMessage(error.message);
    }
  };

  useEffect(() => {
    loadMealHistory();
  }, [selectedDate]);

  const totalCalories = useMemo(() => {
    return mealRecords.reduce((calorieTotal, meal) => calorieTotal + meal.calories, 0);
  }, [mealRecords]);

  /*
    Delete handler
    Secili listedeki kaydi siler ve ayni tarih filtresiyle listeyi yeniler.
  */
  const handleDeleteMeal = async (mealId) => {
    try {
      await deleteMeal(mealId);
      setIsErrorMessage(false);
      setFeedbackMessage("Öğün kaydı silindi.");
      await loadMealHistory();
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
              <h1>Tüm Öğünler</h1>
              <p>
                {selectedDate
                  ? `${selectedDate} tarihli kayıtlar`
                  : currentUser
                    ? `${currentUser.full_name || "Kullanıcı"} için kayıt geçmişi`
                    : "Öğün kayıt geçmişi"}
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
            <h2>{mealRecords.length}</h2>
          </div>

          <div>
            <span className="card-label">Toplam Kalori</span>
            <h2>{totalCalories} Kal</h2>
          </div>
        </section>

        {feedbackMessage && (
          <p className={isErrorMessage ? "auth-error-message" : "auth-success-message"}>
            {feedbackMessage}
          </p>
        )}

        <section className="meal-history-list">
          {mealRecords.length === 0 && (
            <div className="meal-history-empty-card">
              <h3>Bu tarihte öğün kaydı yok.</h3>
              <p>Dashboard üzerindeki hızlı ekleme panelinden yeni öğün ekleyebilirsin.</p>
            </div>
          )}

          {mealRecords.map((meal) => (
            <article key={meal.id} className="meal-history-item-card">
              <div className="meal-history-item-main">
                <div>
                  <span className="meal-history-type-chip">{meal.meal_type}</span>
                  <h3>{meal.name}</h3>
                  <p>{formatMealDate(meal.created_at)}</p>
                </div>

                <strong>{meal.calories} Kal</strong>
              </div>

              <div className="meal-history-macros-row">
                <span>{meal.protein}g Protein</span>
                <span>{meal.carbs}g Karbonhidrat</span>
                <span>{meal.fat}g Yağ</span>
              </div>

              <div className="meal-history-item-actions">
                <button
                  type="button"
                  className="item-delete-button meal-history-delete-button"
                  onClick={() => handleDeleteMeal(meal.id)}
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

export default AddMealPage;
