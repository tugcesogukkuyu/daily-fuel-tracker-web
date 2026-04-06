import ketoDietImage from "../../../assets/images/keto-diet.jpg";
import intermittentFastingImage from "../../../assets/images/intermittent-fasting.jpg";
import glutenFreeDietImage from "../../../assets/images/gluten-free-diet.jpg";

/**
 * Dashboard üst menüsünde gösterilecek ana gezinme bağlantıları.
 * Navigasyon yapısını tek yerde tutarak sayfa içindeki tekrarları azaltıyoruz.
 */
export const DASHBOARD_NAV_ITEMS = [
  { label: "Panel", to: "/", isActive: true },
  { label: "Öğün Ekle", to: "/add-meal" },
  { label: "Egzersiz Ekle", to: "/add-exercise" },
  { label: "Takvim", to: "/calendar" },
  { label: "Blog", to: "/blog" },
];

/**
 * Mini takvimde seçilen güne göre gösterilecek örnek öğün ve egzersiz kayıtları.
 * Bu veri ileride API veya veritabanı kaynağından gelebilir.
 */
export const DASHBOARD_DAY_DETAILS_BY_DAY = {
  12: {
    meals: [
      {
        name: "Yulaf Ezmesi ve Orman Meyveleri",
        calories: 320,
        macros: "P: 12g K: 54g Y: 8g",
      },
      {
        name: "Izgara Tavuklu Salata",
        calories: 450,
        macros: "P: 38g K: 32g Y: 18g",
      },
      {
        name: "Yoğurt",
        calories: 150,
        macros: "P: 15g K: 18g Y: 4g",
      },
    ],
    exercises: [
      { name: "Yoga", calories: 120, durationLabel: "30 dk" },
      { name: "Basketbol", calories: 340, durationLabel: "45 dk" },
    ],
  },
  13: {
    meals: [
      {
        name: "Avokadolu Tost",
        calories: 290,
        macros: "P: 8g K: 28g Y: 16g",
      },
      {
        name: "Hindi Dürüm",
        calories: 410,
        macros: "P: 26g K: 34g Y: 14g",
      },
    ],
    exercises: [{ name: "Koşu", calories: 280, durationLabel: "35 dk" }],
  },
  15: {
    meals: [
      {
        name: "Proteinli Pankek",
        calories: 360,
        macros: "P: 22g K: 40g Y: 10g",
      },
      {
        name: "Somon Kasesi",
        calories: 520,
        macros: "P: 35g K: 30g Y: 24g",
      },
    ],
    exercises: [
      { name: "Bisiklet", calories: 310, durationLabel: "40 dk" },
      { name: "Esneme", calories: 60, durationLabel: "15 dk" },
    ],
  },
};

/**
 * Seçilen güne ait özet kalori değerleri.
 * Öğün ve egzersiz detaylarından bağımsız olarak kısa özet kartlarında kullanılır.
 */
export const DASHBOARD_SUMMARY_BY_DAY = {
  12: { consumedCalories: 1950, burnedCalories: 340 },
  13: { consumedCalories: 1820, burnedCalories: 280 },
  15: { consumedCalories: 2100, burnedCalories: 420 },
};

/**
 * Dashboard üzerinde gösterilecek makro hedef kartları.
 * Şimdilik sabit tutuluyor; ileride kullanıcı verilerine göre dinamikleşebilir.
 */
export const DASHBOARD_MACRO_PROGRESS = [
  {
    id: "protein",
    label: "Protein",
    valueLabel: "59 / 150 g",
    fillClassName: "protein-fill",
  },
  {
    id: "carbs",
    label: "Karbonhidrat",
    valueLabel: "49 / 250 g",
    fillClassName: "carbs-fill",
  },
  {
    id: "fat",
    label: "Yağ",
    valueLabel: "5 / 67 g",
    fillClassName: "fat-fill",
  },
];

/**
 * Dashboard alt bölümünde gösterilecek blog önizleme kartları.
 * Ana blog sayfasına yönlendiren kısa içerik kartları burada tutulur.
 */
export const DASHBOARD_BLOG_PREVIEWS = [
  {
    slug: "ketojenik-beslenme",
    title: "Ketojenik Beslenme",
    image: ketoDietImage,
    excerpt:
      "Ketojenik beslenmenin temel mantığını ve günlük yaşama nasıl uyarlanabileceğini keşfedin.",
  },
  {
    slug: "aralikli-oruc",
    title: "Aralıklı Oruç",
    image: intermittentFastingImage,
    excerpt:
      "Aralıklı oruç yaklaşımının nasıl uygulandığını ve hangi noktalara dikkat edilmesi gerektiğini öğrenin.",
  },
  {
    slug: "glutensiz-beslenme-colyak-diyeti",
    title: "Glutensiz Beslenme",
    image: glutenFreeDietImage,
    excerpt:
      "Glutensiz beslenmenin kimler için gerekli olduğunu ve nasıl planlanabileceğini öğrenin.",
  },
];

/**
 * Seçili gün için kayıt bulunmadığında güvenli varsayılan veri döndürür.
 * Component tarafında gereksiz null kontrolü yapılmasını azaltır.
 */
export const EMPTY_DASHBOARD_DAY_DETAILS = {
  meals: [],
  exercises: [],
};

/**
 * Özet kalori verisi olmayan günlerde kullanılacak varsayılan değerler.
 */
export const EMPTY_DASHBOARD_SUMMARY = {
  consumedCalories: 0,
  burnedCalories: 0,
};
