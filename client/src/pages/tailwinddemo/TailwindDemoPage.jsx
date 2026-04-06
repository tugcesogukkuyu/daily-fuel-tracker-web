import { Link } from "react-router-dom";

/**
 * Tailwind kullanım örneğini göstermek için hazırlanan demo kartları.
 * Görünüm ile içerik verisini ayırarak tekrar eden JSX'i azaltıyoruz.
 */
const TAILWIND_DEMO_CARDS = [
  {
    id: "nutrition-summary",
    categoryLabel: "Beslenme",
    categoryClassName: "bg-emerald-100 text-emerald-700",
    title: "Ozet Kart",
    description:
      "Tailwind ile spacing, renk, radius ve tipografi ayarlari dogrudan className icinde verilir.",
  },
  {
    id: "interface-demo",
    categoryLabel: "Arayuz",
    categoryClassName: "bg-orange-100 text-orange-700",
    title: "Hizli Deneme",
    description:
      "Bu sayfa, Tailwind kullanimini ana projeyi bozmadan gostermek amaciyla hazirlandi.",
  },
  {
    id: "utility-class-demo",
    categoryLabel: "Demo",
    categoryClassName: "bg-cyan-100 text-cyan-700",
    title: "Utility Class",
    description:
      "Tek tek CSS yazmadan, hazir utility class yapisiyla duzen kurulabilir.",
  },
];

/**
 * Tailwind sınıflarıyla hazırlanmış örnek kart düzenini gösterir.
 * Sayfa küçük olduğu için tek dosyada kalabilir, ancak tekrar eden kart yapısı veri üzerinden üretilir.
 */
function TailwindDemoPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Sayfa başlığı ve geri dönüş aksiyonu */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Tailwind Demo
            </h1>

            <p className="mt-2 text-base text-slate-500">
              Tailwind utility class mantigiyla olusturulmus ornek arayuz
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white no-underline"
          >
            Geri Don
          </Link>
        </div>

        {/* Demo kart listesi */}
        <div className="grid gap-6 md:grid-cols-3">
          {TAILWIND_DEMO_CARDS.map((demoCard) => (
            <article
              key={demoCard.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${demoCard.categoryClassName}`}
              >
                {demoCard.categoryLabel}
              </span>

              <h2 className="mt-4 text-2xl font-bold text-slate-900">
                {demoCard.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {demoCard.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default TailwindDemoPage;
