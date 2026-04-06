import { Link, useParams } from "react-router-dom";
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
 * Blog detay sayfasında slug'e göre gösterilecek içerikler.
 * İdeal final yapıda bu veri ayrı bir content/data dosyasına taşınmalıdır.
 */
const BLOG_POST_CONTENT_BY_SLUG = {
  "ketojenik-beslenme": {
    title: "Ketojenik Beslenme",
    image: ketoDietImage,
    sections: [
      {
        heading: "Ketojenik Beslenme Nedir?",
        paragraphs: [
          "Ketojenik beslenme, karbonhidrat tüketimini ciddi şekilde azaltıp, enerjinin büyük kısmını yağlardan elde etmeye dayanan bir beslenme modelidir. Bu düzende vücut, normalde kullandığı glikoz yerine “keton” adı verilen alternatif bir yakıtı üretir ve buna ketozis durumu denir. Amaç; kan şekeri dalgalanmalarını azaltmak, yağ yakımını artırmak ve daha stabil bir enerji seviyesine ulaşmaktır.",
        ],
      },
      {
        heading: "Ne Yenir? Nasıl Bir Plan Oluşturabilirsin?",
        paragraphs: [
          "Ketojenik beslenmede temel mantık:",
          "düşük karbonhidrat + yüksek yağ + yeterli protein",
          "Başlamak için şu tarz bir yol izleyebilirsin:",
        ],
        bullets: [
          "Yağ kaynakları: Zeytinyağı, tereyağı, avokado, Hindistan cevizi yağı",
          "Protein: Yumurta, kırmızı et, tavuk, balık (özellikle somon gibi yağlı balıklar)",
          "Sebzeler (düşük karbonhidratlı): Brokoli, kabak, ıspanak, salatalık, marul",
          "Atıştırmalık: Badem, ceviz, fındık (ölçülü şekilde)",
          "Süt ürünleri: Tam yağlı peynir, yoğurt (şekersiz)",
          "Basit bir günlük örnek:",
          "Kahvaltı: Yumurtalı avokado + zeytin",
          "Öğle: Zeytinyağlı salata + ızgara tavuk",
          "Akşam: Sebzeli et yemeği (patatessiz)",
          "Bu şekilde ilerleyerek, karbonhidratı azaltıp yağ tüketimini artırmaya odaklanabilirsin.",
        ],
      },
      {
        heading: "Dikkat Etmen Gerekenler",
        bullets: [
          "Karbonhidrat tuzaklarına dikkat et: Ekmek, makarna, pirinç, şekerli içecekler ketoyu bozar",
          "Su tüketimini artır: Ketojenik beslenmede vücut daha fazla su kaybeder",
          "Elektrolit dengesini koru: Tuz, magnezyum ve potasyum önemli",
          "Protein abartılmamalı: Fazla protein de ketozisi zorlaştırabilir",
          "Geçiş sürecine hazır ol: İlk günlerde halsizlik (“keto flu”) normaldir",
        ],
      },
      {
        heading: "Önemli Not",
        paragraphs: [
          "Bu içerik yalnızca bilgilendirme amaçlıdır. Her bireyin metabolizması ve sağlık durumu farklıdır. Özellikle kronik hastalığın, düzenli ilaç kullanımın veya özel bir sağlık durumun varsa, ketojenik beslenmeye başlamadan önce mutlaka bir doktor veya beslenme uzmanına danışman önerilir.",
        ],
      },
    ],
  },

  "aralikli-oruc": {
    title: "Aralıklı Oruç",
    image: intermittentFastingImage,
    sections: [
      {
        heading: "Aralıklı Oruç (Intermittent Fasting) Nedir?",
        paragraphs: [
          "Aralıklı oruç, ne yediğinden çok ne zaman yediğine odaklanan bir beslenme modelidir. Bu yöntemde gün, yemek yenilen ve yenilmeyen zaman dilimlerine ayrılır. En yaygın uygulamalardan biri 16:8 modelidir (16 saat açlık, 8 saat beslenme). Amaç; vücudun dinlenmesini sağlamak, insülin seviyelerini dengelemek ve yağ yakımını desteklemektir.",
        ],
      },
      {
        heading: "Nasıl Uygulanır? Ne Tüketebilirsin?",
        paragraphs: [
          "Aralıklı oruçta belirli saat aralıklarında beslenerek düzen kurman gerekir. Örneğin:",
        ],
        bullets: [
          "16:8 modeli:",
          "12:00 – 20:00 arası yemek",
          "20:00 – 12:00 arası açlık",
          "Bu süreçte:",
          "Açlık süresince: Su, şekersiz çay, sade kahve tüketebilirsin",
          "Yemek saatlerinde:",
          "Protein: Tavuk, balık, yumurta",
          "Sağlıklı yağlar: Zeytinyağı, avokado",
          "Kompleks karbonhidrat: Tam tahıllar (ölçülü)",
          "Sebze & lif: Salata, yeşillikler",
          "Basit bir plan:",
          "İlk öğün: Dengeli bir kahvaltı (protein + yağ)",
          "Ara öğün (isteğe bağlı): Kuruyemiş veya yoğurt",
          "Akşam: Sebze + protein ağırlıklı bir yemek",
          "Buradaki amaç, yemek saatlerinde dengeli ve doyurucu beslenmek.",
        ],
      },
      {
        heading: "Dikkat Etmen Gerekenler",
        bullets: [
          "Açlık sürecinde kalori almamaya dikkat et",
          "Aşırı yemek hatasına düşme: “Aç kaldım” diye kontrolsüz yemek sistemi bozar",
          "Su tüketimini artır",
          "Uyku düzeni önemli: Açlık sürecini daha rahat geçirmeni sağlar",
          "Yavaş başla: Direkt 16 saat yerine 12–14 saatle başlayabilirsin",
        ],
      },
      {
        heading: "Önemli Not",
        paragraphs: [
          "Bu içerik yalnızca bilgilendirme amaçlıdır. Her bireyin metabolizması ve sağlık durumu farklıdır. Özellikle kronik bir rahatsızlığın varsa, düzenli ilaç kullanıyorsan veya özel bir beslenme ihtiyacın bulunuyorsa, aralıklı oruç uygulamadan önce mutlaka bir doktor veya beslenme uzmanına danışman önerilir.",
        ],
      },
    ],
  },

  "akdeniz-tipi-beslenme": {
    title: "Akdeniz Tipi Beslenme",
    image: mediterraneanDietImage,
    sections: [
      {
        heading: "Akdeniz Tipi Beslenme Nedir?",
        paragraphs: [
          "Akdeniz tipi beslenme, adını Akdeniz bölgesinde yaşayan toplumların geleneksel beslenme alışkanlıklarından alır. Bu model; doğal, işlenmemiş gıdalar, sağlıklı yağlar ve dengeli öğünler üzerine kuruludur. Kalp sağlığını desteklemesi, uzun ömürle ilişkilendirilmesi ve sürdürülebilir olmasıyla öne çıkar.",
        ],
      },
      {
        heading: "Ne Yenir? Nasıl Bir Plan Oluşturabilirsin?",
        paragraphs: [
          "Bu beslenme türünde temel yaklaşım:",
          "doğal + dengeli + çeşitlilik",
          "Başlamak için şu şekilde ilerleyebilirsin:",
        ],
        bullets: [
          "Ana yağ kaynağı: Zeytinyağı",
          "Protein: Balık (özellikle haftada 2–3 kez), tavuk, baklagiller",
          "Sebze & meyve: Günlük bol miktarda (mevsiminde)",
          "Tahıllar: Tam buğday, yulaf, bulgur",
          "Süt ürünleri: Yoğurt, peynir (ölçülü)",
          "Kuruyemiş: Badem, ceviz",
          "Basit bir günlük örnek:",
          "Kahvaltı: Zeytin, peynir, tam buğday ekmeği, domates-salatalık",
          "Öğle: Zeytinyağlı sebze yemeği + yoğurt",
          "Akşam: Izgara balık + salata + az miktarda tam tahıl",
          "Bu modelde katı yasaklar yoktur; önemli olan denge ve sürekliliktir.",
        ],
      },
      {
        heading: "Dikkat Etmen Gerekenler (Trickler)",
        bullets: [
          "İşlenmiş gıdalardan uzak dur: Paketli ürünleri minimuma indir",
          "Kırmızı eti sınırlı tüket: Daha çok balık ve bitkisel proteinlere yönel",
          "Zeytinyağını ana yağ yap: Ama miktarı abartma",
          "Mevsiminde beslen: Taze ürünler tercih et",
          "Sosyal ve yavaş yemek kültürü: Hızlı değil, keyifle yemek de bu modelin parçası",
        ],
      },
      {
        heading: "Önemli Not",
        paragraphs: [
          "Bu içerik yalnızca bilgilendirme amaçlıdır. Her bireyin metabolizması ve sağlık durumu farklıdır. Özellikle kronik bir rahatsızlığın varsa, düzenli ilaç kullanıyorsan veya özel bir beslenme planına ihtiyacın bulunuyorsa, bu beslenme modelini uygulamadan önce mutlaka bir doktor veya beslenme uzmanına danışman önerilir.",
        ],
      },
    ],
  },

  "dukan-diyeti": {
    title: "Dukan Diyeti",
    image: dukanDietImage,
    sections: [
      {
        heading: "Dukan Diyeti Nedir?",
        paragraphs: [
          "Dukan diyeti, Fransız beslenme uzmanı Pierre Dukan tarafından geliştirilen, yüksek protein ve düşük karbonhidrat temelli bir beslenme modelidir. Bu diyet, belirli aşamalardan oluşur ve her aşamada farklı beslenme kuralları uygulanır. Amaç; hızlı kilo kaybı sağlamak ve sonrasında verilen kiloyu korumaktır.",
        ],
      },
      {
        heading: "Nasıl Uygulanır? Ne Tüketebilirsin?",
        paragraphs: ["Dukan diyeti 4 aşamadan oluşur:"],
        bullets: [
          "1. Atak Evresi (Attack):",
          "Sadece protein ağırlıklı beslenilir",
          "Tavuk, hindi, yağsız kırmızı et",
          "Yumurta",
          "Yağsız süt ürünleri",
          "2. Seyir Evresi (Cruise):",
          "Protein + sebze eklenir",
          "Brokoli, kabak, salatalık, yeşillikler",
          "3. Güçlendirme Evresi (Consolidation):",
          "Kontrollü şekilde karbonhidrat eklenir",
          "Tam tahıllar, meyve (sınırlı)",
          "4. Koruma Evresi (Stabilization):",
          "Daha esnek ama kurallı bir düzen",
          "Haftada 1 gün sadece protein",
          "Basit başlangıç örneği:",
          "Kahvaltı: Yumurta + yoğurt",
          "Öğle: Izgara tavuk",
          "Akşam: Yağsız et + (ilerleyen aşamada sebze)",
        ],
      },
      {
        heading: "Dikkat Etmen Gerekenler",
        bullets: [
          "Bol su iç: Yüksek protein böbrekleri zorlayabilir",
          "Lif eksikliğine dikkat: İlk aşamalarda kabızlık olabilir",
          "Yulaf kepeği önemli: Diyetin temel desteklerinden biri",
          "Kurallara sadık kal: Aşamalar arası geçiş önemli",
          "Uzun vadeli düşün: Hızlı kilo verdirse de sürdürülebilirlik zor olabilir",
        ],
      },
      {
        heading: "Önemli Not",
        paragraphs: [
          "Bu içerik yalnızca bilgilendirme amaçlıdır. Her bireyin metabolizması ve sağlık durumu farklıdır. Özellikle böbrek hastalığın, metabolik rahatsızlıkların veya düzenli ilaç kullanımın söz konusuysa, Dukan diyetine başlamadan önce mutlaka bir doktor veya beslenme uzmanına danışman önerilir.",
        ],
      },
    ],
  },

  "glutensiz-beslenme-colyak-diyeti": {
    title: "Glutensiz Beslenme (Çölyak Diyeti)",
    image: glutenFreeDietImage,
    sections: [
      {
        heading: "Glutensiz Beslenme (Çölyak Diyeti) Nedir?",
        paragraphs: [
          "Glutensiz beslenme, buğday, arpa ve çavdar gibi tahıllarda bulunan gluten proteininin tamamen diyetten çıkarılması esasına dayanır. Bu beslenme şekli özellikle Çölyak Hastalığı olan bireyler için zorunludur. Çünkü gluten tüketimi, ince bağırsakta hasara yol açarak sindirim ve besin emilimini olumsuz etkiler.",
          "Bu nedenle glutensiz beslenme bir “trend diyet”ten çok, tıbbi gereklilik olarak uygulanır.",
        ],
      },
      {
        heading: "Ne Yenir? Nasıl Bir Plan Oluşturabilirsin?",
        paragraphs: [
          "Glutensiz beslenmede temel mantık:",
          "gluten içeren tüm gıdaları çıkarmak ve alternatiflerle denge kurmak",
          "Tüketebileceğin besinler:",
        ],
        bullets: [
          "Doğal glutensiz gıdalar: Et, tavuk, balık, yumurta",
          "Sebze & meyve: Tüm taze sebze ve meyveler",
          "Tahıl alternatifleri: Pirinç, mısır, karabuğday, kinoa",
          "Baklagiller: Mercimek, nohut, fasulye",
          "Süt ürünleri: Süt, yoğurt, peynir (katkısız olanlar)",
          "Basit bir günlük örnek:",
          "Kahvaltı: Yumurta + peynir + sebze",
          "Öğle: Izgara tavuk + pirinç + salata",
          "Akşam: Sebze yemeği + yoğurt",
        ],
      },
      {
        heading: "Dikkat Etmen Gerekenler",
        bullets: [
          "Etiket okumayı alışkanlık haline getir: “Gluten içermez” ibaresini kontrol et",
          "Çapraz bulaşa dikkat: Aynı tost makinesi, kesme tahtası risk oluşturabilir",
          "Gizli gluten kaynakları: Soslar, hazır ürünler, işlenmiş gıdalar",
          "Dışarıda yemek seçiminde: Restoranlarda içeriği mutlaka sor",
          "Dengeyi koru: Sadece “glutensiz” olması sağlıklı olduğu anlamına gelmez",
        ],
      },
      {
        heading: "Önemli Not",
        paragraphs: [
          "Bu içerik yalnızca bilgilendirme amaçlıdır. Glutensiz beslenme özellikle çölyak hastalığı gibi tıbbi durumlarda hayati önem taşır. Eğer çölyak hastalığı, gluten hassasiyeti veya başka bir sağlık durumun varsa, beslenme düzenini değiştirmeden önce mutlaka bir doktor ve diyetisyen kontrolünde ilerlemen önerilir.",
        ],
      },
    ],
  },

  "vegan-beslenme": {
    title: "Vegan Beslenme",
    image: veganDietImage,
    sections: [
      {
        heading: "Vegan Beslenme Nedir?",
        paragraphs: [
          "Vegan beslenme, hayvansal hiçbir ürünün tüketilmediği tamamen bitki temelli bir beslenme modelidir. Bu düzende et, tavuk, balık, süt, yumurta ve bal gibi tüm hayvansal gıdalar çıkarılır. Veganlık sadece bir diyet değil; aynı zamanda etik, çevresel ve sağlık temelli bir yaşam tarzı olarak da benimsenebilir.",
        ],
      },
      {
        heading: "Ne Yenir? Nasıl Bir Plan Oluşturabilirsin?",
        paragraphs: [
          "Vegan beslenmede temel yaklaşım:",
          "bitki bazlı + dengeli + çeşitli",
          "Tüketebileceğin besinler:",
        ],
        bullets: [
          "Protein kaynakları: Mercimek, nohut, fasulye, tofu, tempeh",
          "Sebze & meyve: Tüm taze ve mevsim sebze-meyveler",
          "Tahıllar: Yulaf, bulgur, tam buğday, kinoa",
          "Sağlıklı yağlar: Zeytinyağı, avokado, kuruyemişler",
          "Bitkisel sütler: Badem sütü, soya sütü, yulaf sütü",
          "Basit bir günlük örnek:",
          "Kahvaltı: Yulaf + bitkisel süt + meyve",
          "Öğle: Mercimek yemeği + salata",
          "Akşam: Sebzeli kinoa + avokado",
        ],
      },
      {
        heading: "Dikkat Etmen Gerekenler",
        bullets: [
          "B12 vitamini takibi önemli: Takviye gerekebilir",
          "Protein dengesine dikkat et: Farklı kaynakları kombine et",
          "Demir ve omega-3 alımını takip et",
          "Hazır vegan ürünlere dikkat: Her “vegan” ürün sağlıklı olmayabilir",
          "Çeşitlilik şart: Tek tip beslenmeden kaçın",
        ],
      },
      {
        heading: "Önemli Not",
        paragraphs: [
          "Bu içerik yalnızca bilgilendirme amaçlıdır. Vegan beslenme doğru planlanmadığında bazı vitamin ve mineral eksikliklerine yol açabilir. Sağlıklı ve dengeli bir şekilde uygulamak için özellikle uzun vadede bir diyetisyen veya doktor kontrolünde ilerlemen önerilir.",
        ],
      },
    ],
  },

  "vejetaryen-beslenme": {
    title: "Vejetaryen Beslenme",
    image: vegetarianDietImage,
    sections: [
      {
        heading: "Vejetaryen Beslenme Nedir?",
        paragraphs: [
          "Vejetaryen beslenme, et ve et ürünlerinin tüketilmediği; ancak bazı türlerinde süt, yumurta gibi hayvansal ürünlerin yer alabildiği bir beslenme modelidir. Veganlıktan farklı olarak daha esnek bir yapıya sahiptir ve farklı alt türleri bulunur (lakto-vejetaryen, ovo-vejetaryen gibi). Amaç genellikle sağlık, etik veya çevresel nedenlerle hayvansal tüketimi azaltmaktır.",
        ],
      },
      {
        heading: "Ne Yenir? Nasıl Bir Plan Oluşturabilirsin?",
        paragraphs: [
          "Vejetaryen beslenmede temel yaklaşım:",
          "bitki ağırlıklı + dengeli + esnek",
          "Tüketebileceğin besinler:",
        ],
        bullets: [
          "Protein kaynakları: Yumurta, süt, yoğurt, peynir (türe göre) / Mercimek, nohut, fasulye",
          "Sebze & meyve: Tüm taze ve mevsim ürünleri",
          "Tahıllar: Yulaf, bulgur, tam buğday, pirinç",
          "Sağlıklı yağlar: Zeytinyağı, avokado, kuruyemişler",
          "Basit bir günlük örnek:",
          "Kahvaltı: Peynir, yumurta, tam buğday ekmeği",
          "Öğle: Sebzeli makarna veya baklagil yemeği",
          "Akşam: Salata + yoğurt + sebze yemeği",
        ],
      },
      {
        heading: "Dikkat Etmen Gerekenler",
        bullets: [
          "Protein çeşitliliğine dikkat et: Tek kaynağa bağlı kalma",
          "Demir ve B12 takibini yap: Özellikle et tüketilmediği için önemli",
          "Hazır karbonhidratlara yüklenme: Sadece makarna-ekmek ağırlıklı beslenme hatalıdır",
          "Dengeyi koru: Sebze, protein ve yağ dengesi önemli",
          "Alt türünü belirle: Lakto, ovo gibi hangi modeli uyguladığını netleştir",
        ],
      },
      {
        heading: "Önemli Not",
        paragraphs: [
          "Bu içerik yalnızca bilgilendirme amaçlıdır. Vejetaryen beslenme doğru planlanmadığında bazı vitamin ve mineral eksikliklerine yol açabilir. Sağlıklı ve dengeli bir şekilde uygulamak için özellikle uzun vadede bir diyetisyen veya doktor kontrolünde ilerlemen önerilir.",
        ],
      },
    ],
  },

  "pesketaryen-beslenme": {
    title: "Pesketaryen Beslenme",
    image: pescetarianDietImage,
    sections: [
      {
        heading: "Pesketaryen Beslenme Nedir?",
        paragraphs: [
          "Pesketaryen beslenme, kırmızı et ve tavuk tüketmeden; ancak balık ve deniz ürünlerinin dahil olduğu bir beslenme modelidir. Temelde vejetaryen beslenmeye benzer, fakat protein kaynağı olarak balık tüketimine izin verir. Bu model; daha hafif, dengeli ve sürdürülebilir bir alternatif olarak tercih edilir.",
        ],
      },
      {
        heading: "Ne Yenir? Nasıl Bir Plan Oluşturabilirsin?",
        paragraphs: [
          "Pesketaryen beslenmede temel yaklaşım:",
          "bitki ağırlıklı + deniz ürünleri destekli",
          "Tüketebileceğin besinler:",
        ],
        bullets: [
          "Protein kaynakları: Balık (somon, levrek, sardalya), karides / Yumurta ve süt ürünleri (isteğe bağlı) / Baklagiller (mercimek, nohut)",
          "Sebze & meyve: Tüm taze ve mevsim ürünleri",
          "Tahıllar: Tam buğday, bulgur, pirinç, kinoa",
          "Sağlıklı yağlar: Zeytinyağı, avokado, kuruyemişler",
          "Basit bir günlük örnek:",
          "Kahvaltı: Yumurta + sebze + tam tahıl",
          "Öğle: Ton balıklı salata",
          "Akşam: Izgara somon + sebze + zeytinyağı",
        ],
      },
      {
        heading: "Dikkat Etmen Gerekenler",
        bullets: [
          "Balık seçimine dikkat et: Ağır metal (cıva) riski düşük türleri tercih et",
          "Kızartmadan kaçın: Izgara, fırın veya buğulama daha sağlıklı",
          "Omega-3 avantajını kullan: Haftada 2–3 kez balık tüket",
          "Dengeyi koru: Sadece balık değil, sebze ve lif de önemli",
          "Tazelik önemli: Deniz ürünlerinde kaliteye dikkat et",
        ],
      },
      {
        heading: "Önemli Not",
        paragraphs: [
          "Bu içerik yalnızca bilgilendirme amaçlıdır. Her bireyin beslenme ihtiyacı farklıdır. Özellikle sağlık sorunların, alerjin veya özel bir diyet gereksinimin varsa, bu beslenme modeline başlamadan önce bir doktor veya beslenme uzmanına danışman önerilir.",
        ],
      },
    ],
  },

  "alkalin-diyeti": {
    title: "Alkalin Diyeti",
    image: alkalineDietImage,
    sections: [
      {
        heading: "Alkali (Alkalin) Beslenme Nedir?",
        paragraphs: [
          "Alkali beslenme (diğer adıyla alkalin diyet), vücudun asit-baz dengesini korumayı hedefleyen bir beslenme modelidir. Bu yaklaşıma göre bazı besinler vücutta “asit”, bazıları ise “alkali” etki oluşturur. Amaç; asidik yükü azaltıp daha çok sebze, meyve ve bitki bazlı gıdalarla alkali ağırlıklı bir denge kurmaktır.",
        ],
      },
      {
        heading: "Ne Yenir? Nasıl Bir Plan Oluşturabilirsin?",
        paragraphs: [
          "Alkali beslenmede temel yaklaşım:",
          "sebze ağırlıklı + doğal + işlenmemiş",
          "Tüketebileceğin besinler:",
        ],
        bullets: [
          "Alkali etkili gıdalar: Ispanak, brokoli, salatalık, kabak / Limon (tadı asidik olsa da vücutta alkali etki bırakır), avokado",
          "Meyveler: Elma, muz, armut, çilek",
          "Kuruyemiş & tohumlar: Badem, chia, keten tohumu",
          "Bitkisel protein: Mercimek, nohut",
          "Basit bir günlük örnek:",
          "Kahvaltı: Meyve + badem + bitki çayı",
          "Öğle: Büyük bir yeşil salata + zeytinyağı",
          "Akşam: Sebze yemeği + baklagil",
        ],
      },
      {
        heading: "Dikkat Etmen Gerekenler (Trickler)",
        bullets: [
          "Aşırı kısıtlamadan kaçın: Tüm asidik gıdaları tamamen çıkarmak doğru olmayabilir",
          "Su tüketimini artır: Alkali denge için önemli",
          "İşlenmiş gıdalardan uzak dur: Asidik yükü artırır",
          "Dengeyi koru: Sadece tek tip beslenme uzun vadede sorun yaratabilir",
          "Bilimsel yaklaşımı göz ardı etme: Vücudun pH dengesi aslında sıkı şekilde kontrol edilir",
        ],
      },
      {
        heading: "Önemli Not",
        paragraphs: [
          "Bu içerik yalnızca bilgilendirme amaçlıdır. Alkali beslenme bazı kişiler için faydalı alışkanlıklar kazandırsa da, tüm sağlık sorunlarını çözen bir yöntem değildir. Beslenme düzenini değiştirmeden önce özellikle sağlık durumuna göre bir doktor veya diyetisyen görüşü alman önerilir.",
        ],
      },
    ],
  },
};

/**
 * Geçersiz slug durumunda gösterilecek güvenli varsayılan içerik.
 */
const FALLBACK_BLOG_POST = {
  title: "Blog İçeriği Bulunamadı",
  image: ketoDietImage,
  sections: [
    {
      heading: "İçerik Bulunamadı",
      paragraphs: ["Seçtiğiniz blog yazısı için içerik bulunamadı."],
    },
  ],
};

/**
 * URL'den gelen slug değerine göre gösterilecek blog içeriğini döndürür.
 */
function getBlogPostBySlug(slug) {
  if (!slug) {
    return FALLBACK_BLOG_POST;
  }

  return BLOG_POST_CONTENT_BY_SLUG[slug] ?? FALLBACK_BLOG_POST;
}

function BlogDetailPage() {
  // URL parametresinden hangi blog yazısının açılacağını alıyoruz.
  const { slug } = useParams();

  // Sayfada gösterilecek içerik slug'e göre belirlenir.
  const selectedBlogPost = getBlogPostBySlug(slug);

  return (
    <main className="page-shell">
      <section className="page-card">
        {/* Sayfa üst alanı */}
        <div className="page-header">
          <Link to="/blog" className="back-button">
            ←
          </Link>
          <h1>Diyet ve Beslenme Blogu</h1>
        </div>

        <article className="blog-detail-article">
          {/* Kapak görseli ve içerik özeti */}
          <img
            src={selectedBlogPost.image}
            alt={selectedBlogPost.title}
            className="blog-detail-image"
          />

          <div className="blog-detail-meta">
            <span className="blog-tag">{selectedBlogPost.title}</span>
          </div>

          <h2>{selectedBlogPost.title}</h2>

          {/* Blog içeriği bölümler halinde gösterilir */}
          <div className="blog-detail-content">
            {selectedBlogPost.sections.map((contentSection) => (
              <section
                key={contentSection.heading}
                className="blog-content-section"
              >
                <h3>{contentSection.heading}</h3>

                {contentSection.paragraphs?.map((paragraph) => (
                  <p key={`${contentSection.heading}-${paragraph.slice(0, 40)}`}>
                    {paragraph}
                  </p>
                ))}

                {contentSection.bullets && (
                  <ul className="blog-bullet-list">
                    {contentSection.bullets.map((bulletItem) => (
                      <li
                        key={`${contentSection.heading}-${bulletItem.slice(0, 40)}`}
                      >
                        {bulletItem}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default BlogDetailPage;

