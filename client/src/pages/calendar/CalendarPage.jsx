import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthenticatedUser } from "../../services/authService";
import { getMeals } from "../../services/mealService";
import { getExercises } from "../../services/exerciseService";

const WEEKDAY_LABELS = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
const MONTH_NAMES = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

/*
  Calendar page
  Takvim ekranini backend verileriyle dinamik olarak gosterir.
  Ay gezintisi, gun secimi ve secili gun ozetleri bu sayfada yonetilir.
*/
function CalendarPage() {
  /*
    Page state
    Sayfanin ihtiyac duydugu meal, exercise, secili tarih ve gorunen ay state'lerini tutar.
  */
  const [currentUser, setCurrentUser] = useState(null);
  const [mealRecords, setMealRecords] = useState([]);
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [visibleMonthDate, setVisibleMonthDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  /*
    Calendar data loading
    Sayfa ilk acildiginda backend'den meal ve exercise kayitlarini alir.
  */
  useEffect(() => {
    const loadCalendarRecords = async () => {
      try {
        let authenticatedUser = null;

        try {
          const authenticatedUserResponse = await getAuthenticatedUser();
          authenticatedUser = authenticatedUserResponse.data;
        } catch (error) {
          setCurrentUser(null);
          setMealRecords([]);
          setExerciseRecords([]);
          return;
        }

        const mealResponse = await getMeals();
        const exerciseResponse = await getExercises();

        setCurrentUser(authenticatedUser);
        setMealRecords((mealResponse.data ?? []).filter((meal) => meal.user_id === authenticatedUser.id));
        setExerciseRecords(
          (exerciseResponse.data ?? []).filter((exercise) => exercise.user_id === authenticatedUser.id)
        );
      } catch (error) {
        console.error("Takvim verileri alınamadı:", error);
      }
    };

    loadCalendarRecords();
  }, []);

  /*
    Visible month details
    Ekranda gosterilen ayin ay ve yil bilgisini, ilk gun konumunu ve toplam gun sayisini hesaplar.
  */
  const visibleMonth = visibleMonthDate.getMonth();
  const visibleYear = visibleMonthDate.getFullYear();

  const firstWeekdayIndex = useMemo(() => {
    return new Date(visibleYear, visibleMonth, 1).getDay();
  }, [visibleYear, visibleMonth]);

  const totalDayCount = useMemo(() => {
    return new Date(visibleYear, visibleMonth + 1, 0).getDate();
  }, [visibleYear, visibleMonth]);

  /*
    Visible month records
    Sadece ekranda gorunen ay ve yila ait meal ve exercise kayitlarini ayirir.
  */
  const visibleMonthMeals = mealRecords.filter((meal) => {
    const mealDate = new Date(meal.created_at);

    return (
      mealDate.getMonth() === visibleMonth &&
      mealDate.getFullYear() === visibleYear
    );
  });

  const visibleMonthExercises = exerciseRecords.filter((exercise) => {
    const exerciseDate = new Date(exercise.created_at);

    return (
      exerciseDate.getMonth() === visibleMonth &&
      exerciseDate.getFullYear() === visibleYear
    );
  });

  /*
    Active day markers
    Secili ay icinde kayit olan gunleri bulur ve takvim uzerinde isaretlemek icin hazirlar.
  */
  const monthDaysWithEntries = new Set([
    ...visibleMonthMeals.map((meal) => new Date(meal.created_at).getDate()),
    ...visibleMonthExercises.map((exercise) =>
      new Date(exercise.created_at).getDate()
    ),
  ]);

  /*
    Selected day records
    Secili tarihe ait meal ve exercise kayitlarini ayirir.
  */
  const selectedDayMeals = mealRecords.filter((meal) => {
    const mealDate = new Date(meal.created_at);

    return (
      mealDate.getDate() === selectedDate.getDate() &&
      mealDate.getMonth() === selectedDate.getMonth() &&
      mealDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const selectedDayExercises = exerciseRecords.filter((exercise) => {
    const exerciseDate = new Date(exercise.created_at);

    return (
      exerciseDate.getDate() === selectedDate.getDate() &&
      exerciseDate.getMonth() === selectedDate.getMonth() &&
      exerciseDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  /*
    Selected day summary
    Secili gunun alinan, yakilan ve net kalori ozetini gercek kayitlardan hesaplar.
  */
  const consumedCalories = selectedDayMeals.reduce(
    (totalCalories, meal) => totalCalories + meal.calories,
    0
  );

  const burnedCalories = selectedDayExercises.reduce(
    (totalCalories, exercise) => totalCalories + exercise.calories_burned,
    0
  );

  const netCalories = consumedCalories - burnedCalories;

  /*
    Month navigation handlers
    Onceki ve sonraki aya gecis yapar, secili tarihi de yeni gorunen ayin ilk gunune tasir.
  */
  const handleGoToPreviousMonth = () => {
    const previousMonthDate = new Date(visibleYear, visibleMonth - 1, 1);

    setVisibleMonthDate(previousMonthDate);
    setSelectedDate(previousMonthDate);
  };

  const handleGoToNextMonth = () => {
    const nextMonthDate = new Date(visibleYear, visibleMonth + 1, 1);

    setVisibleMonthDate(nextMonthDate);
    setSelectedDate(nextMonthDate);
  };

  /*
    Day selection handler
    Takvimden secilen gunu tam tarih olarak state'e yazar.
  */
  const handleSelectDay = (dayNumber) => {
    setSelectedDate(new Date(visibleYear, visibleMonth, dayNumber));
  };

  return (
    <main className="page-shell">
      <section className="page-card">
        <div className="page-header">
          <Link to="/" className="back-button">
            ←
          </Link>
          <h1>Takvim</h1>
        </div>

        <div className="calendar-layout">
          <div className="calendar-panel">
            <div className="calendar-top">
              <h2>
                {MONTH_NAMES[visibleMonth]} {visibleYear}
              </h2>

              <div className="calendar-nav">
                <button type="button" onClick={handleGoToPreviousMonth}>
                  ‹
                </button>
                <button type="button" onClick={handleGoToNextMonth}>
                  ›
                </button>
              </div>
            </div>

            <div className="calendar-weekdays">
              {WEEKDAY_LABELS.map((weekdayLabel) => (
                <span key={weekdayLabel}>{weekdayLabel}</span>
              ))}
            </div>

            <div className="calendar-grid">
              {Array.from({ length: firstWeekdayIndex }).map((_, emptyIndex) => (
                <span
                  key={`empty-${visibleYear}-${visibleMonth + 1}-${emptyIndex}`}
                  className="calendar-day calendar-day-empty"
                ></span>
              ))}

              {Array.from({ length: totalDayCount }, (_, dayIndex) => {
                const dayNumber = dayIndex + 1;
                const hasEntry = monthDaysWithEntries.has(dayNumber);

                const isSelectedDay =
                  selectedDate.getDate() === dayNumber &&
                  selectedDate.getMonth() === visibleMonth &&
                  selectedDate.getFullYear() === visibleYear;

                return (
                  <button
                    key={`${visibleYear}-${visibleMonth + 1}-${dayNumber}`}
                    type="button"
                    className={`calendar-day ${
                      hasEntry ? "has-data" : ""
                    } ${isSelectedDay ? "selected-day" : ""}`}
                    onClick={() => handleSelectDay(dayNumber)}
                  >
                    {dayNumber}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="calendar-side-panel">
            <div className="day-summary-card">
              <h2>
                {selectedDate.getDate()}{" "}
                {MONTH_NAMES[selectedDate.getMonth()]}{" "}
                {selectedDate.getFullYear()}
              </h2>

              <div className="summary-mini-card teal-card">
                <span>Alınan Kalori</span>
                <strong>{currentUser ? consumedCalories : "-"}</strong>
              </div>

              <div className="summary-mini-card orange-card">
                <span>Yakılan Kalori</span>
                <strong>{currentUser ? burnedCalories : "-"}</strong>
              </div>

              <div className="summary-mini-card purple-card">
                <span>Net Kalori</span>
                <strong>{currentUser ? netCalories : "-"}</strong>
              </div>
            </div>

            <div className="legend-card">
              <h3>Açıklama</h3>

              <div className="legend-item">
                <span className="legend-dot teal-dot"></span>
                <p>Bu günde kayıt var</p>
              </div>

              <div className="legend-item">
                <span className="legend-dot orange-dot"></span>
                <p>Seçilen günün özeti sağ panelde gösterilir</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CalendarPage;
