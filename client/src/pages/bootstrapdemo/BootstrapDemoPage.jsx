import { Link } from "react-router-dom";

/**
 * Bootstrap bileşen kullanımını göstermek için hazırlanan örnek kart verileri.
 * Bu yapı sayesinde kart görünümü ile içerik verisi birbirinden ayrılır.
 */
const BOOTSTRAP_DEMO_CARDS = [
  {
    id: "nutrition",
    categoryLabel: "Beslenme",
    categoryClassName: "text-bg-success",
    title: "Ketojenik Beslenme",
    description:
      "Bootstrap grid, card, badge ve button yapılarının kullanımını gösteren örnek içerik kartı.",
  },
  {
    id: "exercise",
    categoryLabel: "Egzersiz",
    categoryClassName: "text-bg-warning",
    title: "Aktivite Planı",
    description:
      "Hazır spacing, renk, tipografi ve responsive grid sınıflarıyla hızlı arayüz kurulumu yapılabilir.",
  },
  {
    id: "tracking",
    categoryLabel: "Takip",
    categoryClassName: "text-bg-primary",
    title: "Su Tüketimi",
    description:
      "Bu demo sayfası, projede Bootstrap kullanımını ayrıca gösterme amacıyla hazırlanmıştır.",
  },
];

function BootstrapDemoPage() {
  return (
    <main className="min-vh-100 bg-light py-5">
      <div className="container">
        {/* Sayfa başlığı ve geri dönüş aksiyonu */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold mb-2">Bootstrap Demo</h1>
            <p className="text-secondary mb-0">
              Hazır Bootstrap sınıflarıyla oluşturulmuş örnek kart yapısı
            </p>
          </div>

          <Link to="/" className="btn btn-dark rounded-pill px-4">
            Geri Dön
          </Link>
        </div>

        {/* Demo kart listesi */}
        <div className="row g-4">
          {BOOTSTRAP_DEMO_CARDS.map((demoCard) => (
            <div key={demoCard.id} className="col-md-4">
              <article className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <span
                    className={`badge ${demoCard.categoryClassName} mb-3`}
                  >
                    {demoCard.categoryLabel}
                  </span>

                  <h3 className="h4 fw-bold">{demoCard.title}</h3>

                  <p className="text-secondary">{demoCard.description}</p>

                  <button
                    type="button"
                    className="btn btn-outline-dark rounded-pill"
                  >
                    İncele
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default BootstrapDemoPage;

