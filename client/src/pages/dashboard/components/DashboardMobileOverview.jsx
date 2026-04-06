/**
 * Dashboard'ın mobil görünümündeki özet kartlarını gösterir.
 * Masaüstü özetinin daha kompakt karşılığını, aynı görsel dili koruyarak sunar.
 */
function DashboardMobileOverview({
  consumedCalories,
  burnedCalories,
  netCalories,
  proteinTotal,
  carbsTotal,
  fatTotal,
}) {
  return (
    <section className="dashboard-mobile-overview">
      <div className="mobile-overview-card mobile-overview-card-dark">
        <div className="mobile-overview-row">
          <div>
            <span className="card-label">Alınan Kalori</span>
            <h3>{consumedCalories}</h3>
          </div>

          <div>
            <span className="card-label">Yakılan Kalori</span>
            <h3>{burnedCalories}</h3>
          </div>

          <div>
            <span className="card-label">Net Kalori</span>
            <h3>{netCalories}</h3>
          </div>
        </div>
      </div>

      <div className="mobile-overview-card mobile-overview-card-macro">
        <div className="mobile-overview-row">
          <div>
            <span className="card-label">Protein</span>
            <h3>{proteinTotal} g</h3>
          </div>

          <div>
            <span className="card-label">Karbonhidrat</span>
            <h3>{carbsTotal} g</h3>
          </div>

          <div>
            <span className="card-label">Yağ</span>
            <h3>{fatTotal} g</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardMobileOverview;
