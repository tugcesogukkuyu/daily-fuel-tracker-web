/**
 * Seçili güne ait makro toplamlarını tek bir yatay kart içinde gösterir.
 * Protein, karbonhidrat ve yağ değerleri ayırıcı çizgilerle sunulur.
 */
function DashboardMacrosSection({ proteinTotal, carbsTotal, fatTotal }) {
  return (
    <section className="dashboard-macros">
      <div className="macro-inline-block">
        <span className="macro-inline-icon macro-inline-icon-protein" aria-hidden="true" />
        <span className="card-label">Protein</span>
        <h3>{proteinTotal} g</h3>
      </div>

      <div className="macro-inline-block">
        <span className="macro-inline-icon macro-inline-icon-carbs" aria-hidden="true" />
        <span className="card-label">Karbonhidrat</span>
        <h3>{carbsTotal} g</h3>
      </div>

      <div className="macro-inline-block">
        <span className="macro-inline-icon macro-inline-icon-fat" aria-hidden="true" />
        <span className="card-label">Yağ</span>
        <h3>{fatTotal} g</h3>
      </div>
    </section>
  );
}

export default DashboardMacrosSection;
