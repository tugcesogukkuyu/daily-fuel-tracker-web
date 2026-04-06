import { Link } from "react-router-dom";
import ketoDietImage from "../../assets/images/keto-diet.jpg";
import intermittentFastingImage from "../../assets/images/intermittent-fasting.jpg";
import mediterraneanDietImage from "../../assets/images/mediterranean-diet.jpg";
import dukanDietImage from "../../assets/images/dukan-diet.jpg";
import glutenFreeDietImage from "../../assets/images/gluten-free-diet.jpg";
import veganDietImage from "../../assets/images/vegan-diet.jpg";
import vegetarianDietImage from "../../assets/images/vegetarian-diet.jpg";
import pescetarianDietImage from "../../assets/images/pescetarian-diet.jpg";
import alkalineDietImage from "../../assets/images/alkaline-diet.jpg";

/**
 * Blog liste sayfasında gösterilecek özet içerikler.
 * İleride bu veri API'den gelecekse service katmanına taşınabilir.
 */
const BLOG_POST_SUMMARIES = [
  {
    title: "Ketojenik Beslenme",
    slug: "ketojenik-beslenme",
    image: ketoDietImage,
    excerpt:
      "Ketojenik beslenmenin temel mantığını ve günlük yaşama nasıl uyarlanabileceğini keşfedin.",
  },
  {
    title: "Aralıklı Oruç",
    slug: "aralikli-oruc",
    image: intermittentFastingImage,
    excerpt:
      "Aralıklı oruç yaklaşımının nasıl uygulandığını ve hangi noktalara dikkat edilmesi gerektiğini öğrenin.",
  },
  {
    title: "Akdeniz Tipi Beslenme",
    slug: "akdeniz-tipi-beslenme",
    image: mediterraneanDietImage,
    excerpt:
      "Akdeniz tipi beslenmenin sağlıklı yaşam üzerindeki etkilerini ve temel prensiplerini inceleyin.",
  },
  {
    title: "Dukan Diyeti",
    slug: "dukan-diyeti",
    image: dukanDietImage,
    excerpt:
      "Dukan diyetinin aşamalarını ve uygulama sürecinde dikkat edilmesi gerekenleri inceleyin.",
  },
  {
    title: "Glutensiz Beslenme (Çölyak Diyeti)",
    slug: "glutensiz-beslenme-colyak-diyeti",
    image: glutenFreeDietImage,
    excerpt:
      "Glutensiz beslenmenin kimler için gerekli olduğunu ve nasıl planlanabileceğini öğrenin.",
  },
  {
    title: "Vegan Beslenme",
    slug: "vegan-beslenme",
    image: veganDietImage,
    excerpt:
      "Vegan beslenmede dengeli öğün oluşturmanın yollarını ve dikkat edilmesi gereken noktaları keşfedin.",
  },
  {
    title: "Vejetaryen Beslenme",
    slug: "vejetaryen-beslenme",
    image: vegetarianDietImage,
    excerpt:
      "Vejetaryen beslenme düzeninde yeterli ve dengeli beslenmenin nasıl sağlanacağını inceleyin.",
  },
  {
    title: "Pesketaryen Beslenme",
    slug: "pesketaryen-beslenme",
    image: pescetarianDietImage,
    excerpt:
      "Pesketaryen beslenmenin temel yapısını ve sağlıklı öğün planlamasını öğrenin.",
  },
  {
    title: "Alkalin Diyeti",
    slug: "alkalin-diyeti",
    image: alkalineDietImage,
    excerpt:
      "Alkalin diyetinin ne olduğunu ve bu yaklaşımın günlük beslenme düzenine etkilerini keşfedin.",
  },
];

function BlogPage() {
  return (
    <main className="page-shell">
      <section className="page-card">
        {/* Sayfa üst alanı */}
        <div className="page-header">
          <Link to="/" className="back-button">
            ←
          </Link>
          <h1>Diyet ve Beslenme Blogu</h1>
        </div>

        {/* Sayfa açıklama alanı */}
        <div className="blog-page-header">
          <h2>Beslenme İçeriklerini Keşfet</h2>
          <p>
            Farklı beslenme yaklaşımları hakkında hazırlanan içeriklere göz atın.
          </p>
        </div>

        {/* Filtre alanı şu an tek kategori gösterecek şekilde hazırlanmıştır.
            İleride gerçek kategori filtreleme eklenecekse state ve filtre mantığıyla genişletilebilir. */}
        <div className="blog-filter-row">
          <span className="filter-chip active-chip">Tümü</span>
        </div>

        {/* Blog kart listesi */}
        <div className="blog-list-grid">
          {BLOG_POST_SUMMARIES.map((blogPostSummary) => (
            <article key={blogPostSummary.slug} className="blog-list-card">
              <img
                src={blogPostSummary.image}
                alt={blogPostSummary.title}
                className="blog-list-image"
              />

              <div className="blog-list-body">
                <span className="blog-tag">{blogPostSummary.title}</span>
                <h3>{blogPostSummary.title}</h3>
                <p>{blogPostSummary.excerpt}</p>

                <Link
                  to={`/blog/${blogPostSummary.slug}`}
                  className="read-more-link"
                >
                  Devamını Oku
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default BlogPage;
