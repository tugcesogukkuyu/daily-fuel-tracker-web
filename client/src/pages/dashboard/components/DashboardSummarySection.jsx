/**
 * Gün bazlı ana özet kartlarını gösterir.
 * Alınan, yakılan ve net kalori bilgileri bu bölümde sunulur.
 */
function DashboardSummarySection({
  consumedCalories,
  burnedCalories,
  netCalories,
}) {
  return (
    <section className="dashboard-summary">
      <div className="summary-card">
        <span className="card-label">Alınan Kalori</span>
        <h2>{consumedCalories}</h2>
      </div>

      <div className="summary-card">
        <span className="card-label">Yakılan Kalori</span>
        <h2>{burnedCalories}</h2>
      </div>

      <div className="summary-card net-card">
        <span className="card-label">Net Kalori</span>
        <h2>{netCalories}</h2>
      </div>
    </section>
  );
}

export default DashboardSummarySection;
