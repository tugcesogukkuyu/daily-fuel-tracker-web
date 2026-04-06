import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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

/**
 * Dashboard sağ sütunundaki mini takvim alanını gösterir.
 * Ay geçişi, gün seçimi ve kısa kalori özeti bu bölümden yönetilir.
 */
function DashboardMiniCalendar({
  selectedDate,
  consumedCalories,
  burnedCalories,
  onSelectDate,
}) {
  const [visibleMonthDate, setVisibleMonthDate] = useState(() => {
    return new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
  });

  const visibleMonth = visibleMonthDate.getMonth();
  const visibleYear = visibleMonthDate.getFullYear();

  const totalDayCount = useMemo(() => {
    return new Date(visibleYear, visibleMonth + 1, 0).getDate();
  }, [visibleMonth, visibleYear]);

  const handleShowPreviousMonth = () => {
    setVisibleMonthDate(new Date(visibleYear, visibleMonth - 1, 1));
  };

  const handleShowNextMonth = () => {
    setVisibleMonthDate(new Date(visibleYear, visibleMonth + 1, 1));
  };

  return (
    <div className="dashboard-calendar-card">
      <div className="section-top">
        <h2>Takvim</h2>
        <Link to="/calendar" className="section-link">
          Görüntüle
        </Link>
      </div>

      <div className="mini-calendar-box">
        <div className="mini-calendar-header">
          <button
            type="button"
            className="mini-calendar-nav-button"
            onClick={handleShowPreviousMonth}
          >
            ←
          </button>

          <span>
            {MONTH_NAMES[visibleMonth]} {visibleYear}
          </span>

          <button
            type="button"
            className="mini-calendar-nav-button"
            onClick={handleShowNextMonth}
          >
            →
          </button>
        </div>

        <div className="mini-calendar-grid">
          {Array.from({ length: totalDayCount }, (_, dayIndex) => {
            const dayNumber = dayIndex + 1;

            const isSelectedDay =
              selectedDate.getDate() === dayNumber &&
              selectedDate.getMonth() === visibleMonth &&
              selectedDate.getFullYear() === visibleYear;

            return (
              <button
                key={`${visibleYear}-${visibleMonth + 1}-${dayNumber}`}
                type="button"
                className={`mini-calendar-day ${
                  isSelectedDay ? "mini-selected-day" : ""
                }`}
                onClick={() =>
                  onSelectDate(new Date(visibleYear, visibleMonth, dayNumber))
                }
              >
                {dayNumber}
              </button>
            );
          })}
        </div>

        <div className="mini-calendar-summary">
          <p>Alınan: {consumedCalories}</p>
          <p>Yakılan: {burnedCalories}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardMiniCalendar;
