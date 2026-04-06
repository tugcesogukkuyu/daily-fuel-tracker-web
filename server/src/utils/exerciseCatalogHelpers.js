const EXERCISE_CALORIES_PER_MINUTE = {
  Yürüyüş: 4,
  Koşu: 9,
  Bisiklet: 7,
  Yüzme: 8,
  Tenis: 8,
  "Masa Tenisi": 5,
  Basketbol: 7,
  Futbol: 8,
  Voleybol: 5,
  Boks: 8,
  "Kick Boks": 9,
  Güreş: 8,
  Yoga: 4,
  Pilates: 5,
  Fitness: 6,
  "Ağırlık Antrenmanı": 6,
  Crossfit: 10,
  HIIT: 10,
  "İp Atlama": 10,
  Dans: 6,
  Zumba: 7,
  Aerobik: 6,
  Step: 6,
  "Ev Egzersizi": 5,
  Esneme: 3,
  "Doğa Yürüyüşü": 6,
  Tırmanış: 8,
  Kürek: 8,
  Kayak: 8,
  Paten: 7,
  Kaykay: 5,
  Sörf: 7,
  "At Binme": 5,
  Okçuluk: 3,
  Badminton: 6,
  Hentbol: 7,
  "Su Topu": 8,
  Jimnastik: 6,
  Eliptik: 7,
  "Merdiven Çıkma": 8,
  "Kondisyon Bisikleti": 7,
  "Diğer Egzersiz": 5,
};

const NORMALIZED_EXERCISE_RULES = [
  {
    normalizedName: "Yürüyüş",
    categoryLabel: "Kardiyo",
    intensityLabel: "Düşük tempo",
    equipmentLabel: "Ekipmansız",
    primaryMusclesLabel: "Bacak",
    keywords: ["yürüyüş", "yuruyus", "walk", "walking", "power walk"],
  },
  {
    normalizedName: "Koşu",
    categoryLabel: "Kardiyo",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Ekipmansız",
    primaryMusclesLabel: "Bacak",
    keywords: ["koşu", "kosu", "run", "running", "runner", "jog", "jogging", "sprint", "treadmill run"],
  },
  {
    normalizedName: "Bisiklet",
    categoryLabel: "Kardiyo",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Bisiklet",
    primaryMusclesLabel: "Bacak",
    keywords: ["bisiklet", "bike", "bicycle", "cycling", "cycle", "mountain bike"],
  },
  {
    normalizedName: "Kondisyon Bisikleti",
    categoryLabel: "Kardiyo",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Bisiklet",
    primaryMusclesLabel: "Bacak",
    keywords: ["kondisyon bisikleti", "stationary bike", "exercise bike", "spin bike", "indoor cycling", "spinning"],
  },
  {
    normalizedName: "Yüzme",
    categoryLabel: "Kardiyo",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Havuz",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["yüzme", "yuzme", "swim", "swimming", "pool swim", "freestyle swim"],
  },
  {
    normalizedName: "Tenis",
    categoryLabel: "Spor",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Raket",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["tenis", "tennis", "court tennis"],
  },
  {
    normalizedName: "Masa Tenisi",
    categoryLabel: "Spor",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Raket",
    primaryMusclesLabel: "Kollar",
    keywords: ["masa tenisi", "pinpon", "ping pong", "table tennis"],
  },
  {
    normalizedName: "Basketbol",
    categoryLabel: "Spor",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Top",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["basketbol", "basketball", "basket"],
  },
  {
    normalizedName: "Futbol",
    categoryLabel: "Spor",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Top",
    primaryMusclesLabel: "Bacak",
    keywords: ["futbol", "football", "soccer", "futsal"],
  },
  {
    normalizedName: "Voleybol",
    categoryLabel: "Spor",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Top",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["voleybol", "volleyball", "beach volleyball"],
  },
  {
    normalizedName: "Boks",
    categoryLabel: "Dövüş",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Eldiven",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["boks", "boxing", "box"],
  },
  {
    normalizedName: "Kick Boks",
    categoryLabel: "Dövüş",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Eldiven",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["kick boks", "kickboks", "kick boxing", "kickboxing", "muay thai"],
  },
  {
    normalizedName: "Güreş",
    categoryLabel: "Dövüş",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Ekipmansız",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["güreş", "gures", "wrestling", "grappling"],
  },
  {
    normalizedName: "Yoga",
    categoryLabel: "Esneklik",
    intensityLabel: "Düşük tempo",
    equipmentLabel: "Mat",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["yoga", "asana", "vinyasa", "hatha yoga"],
  },
  {
    normalizedName: "Pilates",
    categoryLabel: "Esneklik",
    intensityLabel: "Düşük tempo",
    equipmentLabel: "Mat",
    primaryMusclesLabel: "Karın",
    keywords: ["pilates", "reformer", "mat pilates"],
  },
  {
    normalizedName: "Fitness",
    categoryLabel: "Güç",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Serbest",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["fitness", "workout", "gym", "antrenman", "conditioning"],
  },
  {
    normalizedName: "Ağırlık Antrenmanı",
    categoryLabel: "Güç",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Ağırlık",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: [
      "ağırlık", "agirlik", "weight training", "strength training", "dumbbell",
      "barbell", "bench press", "deadlift", "row", "press", "curl", "extension",
      "machine", "cable", "lateral raise", "lat pulldown", "leg press", "squat",
      "lunge", "pull up", "pull-up", "pullup", "chin up", "chin-up", "chinup"
    ],
  },
  {
    normalizedName: "Crossfit",
    categoryLabel: "Kondisyon",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Karışık",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["crossfit", "wod"],
  },
  {
    normalizedName: "HIIT",
    categoryLabel: "Kardiyo",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Ekipmansız",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["hiit", "interval training", "high intensity interval"],
  },
  {
    normalizedName: "İp Atlama",
    categoryLabel: "Kardiyo",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "İp",
    primaryMusclesLabel: "Bacak",
    keywords: ["ip atlama", "jump rope", "rope skipping", "skipping rope"],
  },
  {
    normalizedName: "Dans",
    categoryLabel: "Kardiyo",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Ekipmansız",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["dans", "dance", "dancing"],
  },
  {
    normalizedName: "Zumba",
    categoryLabel: "Kardiyo",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Ekipmansız",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["zumba"],
  },
  {
    normalizedName: "Aerobik",
    categoryLabel: "Kardiyo",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Ekipmansız",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["aerobik", "aerobic", "aerobics"],
  },
  {
    normalizedName: "Step",
    categoryLabel: "Kardiyo",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Step platformu",
    primaryMusclesLabel: "Bacak",
    keywords: ["step", "step aerobics"],
  },
  {
    normalizedName: "Ev Egzersizi",
    categoryLabel: "Kondisyon",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Ekipmansız",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: [
      "ev egzersizi", "home workout", "bodyweight", "burpee", "plank", "push up",
      "push-up", "pushup", "sit up", "sit-up", "situp", "mountain climber",
      "jumping jack", "crunch", "bodyweight exercise"
    ],
  },
  {
    normalizedName: "Esneme",
    categoryLabel: "Esneklik",
    intensityLabel: "Düşük tempo",
    equipmentLabel: "Ekipmansız",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["esneme", "stretch", "stretching", "mobility", "warm up", "cool down"],
  },
  {
    normalizedName: "Doğa Yürüyüşü",
    categoryLabel: "Kardiyo",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Ekipmansız",
    primaryMusclesLabel: "Bacak",
    keywords: ["doğa yürüyüşü", "doga yuruyusu", "hiking", "trekking", "trail walk"],
  },
  {
    normalizedName: "Tırmanış",
    categoryLabel: "Spor",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Tırmanış duvarı",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["tırmanış", "tirmanis", "climbing", "bouldering", "rock climbing"],
  },
  {
    normalizedName: "Kürek",
    categoryLabel: "Kardiyo",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Kürek",
    primaryMusclesLabel: "Sırt",
    keywords: ["kürek", "kurek", "rowing", "rower", "ergometer"],
  },
  {
    normalizedName: "Kayak",
    categoryLabel: "Spor",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Kayak",
    primaryMusclesLabel: "Bacak",
    keywords: ["kayak", "ski", "skiing"],
  },
  {
    normalizedName: "Paten",
    categoryLabel: "Spor",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Paten",
    primaryMusclesLabel: "Bacak",
    keywords: ["paten", "roller skate", "roller skating", "inline skate", "skating"],
  },
  {
    normalizedName: "Kaykay",
    categoryLabel: "Spor",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Kaykay",
    primaryMusclesLabel: "Bacak",
    keywords: ["kaykay", "skateboard", "skateboarding"],
  },
  {
    normalizedName: "Sörf",
    categoryLabel: "Spor",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Sörf tahtası",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["sörf", "sorf", "surf", "surfing"],
  },
  {
    normalizedName: "At Binme",
    categoryLabel: "Spor",
    intensityLabel: "Orta tempo",
    equipmentLabel: "At",
    primaryMusclesLabel: "Bacak",
    keywords: ["at binme", "horse riding", "horseback riding", "equestrian"],
  },
  {
    normalizedName: "Okçuluk",
    categoryLabel: "Spor",
    intensityLabel: "Düşük tempo",
    equipmentLabel: "Yay",
    primaryMusclesLabel: "Omuz",
    keywords: ["okçuluk", "okculuk", "archery", "bow"],
  },
  {
    normalizedName: "Badminton",
    categoryLabel: "Spor",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Raket",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["badminton"],
  },
  {
    normalizedName: "Hentbol",
    categoryLabel: "Spor",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Top",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["hentbol", "handball"],
  },
  {
    normalizedName: "Su Topu",
    categoryLabel: "Spor",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Top",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["su topu", "water polo"],
  },
  {
    normalizedName: "Jimnastik",
    categoryLabel: "Esneklik",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Ekipmansız",
    primaryMusclesLabel: "Tüm Vücut",
    keywords: ["jimnastik", "gymnastics", "calisthenics"],
  },
  {
    normalizedName: "Eliptik",
    categoryLabel: "Kardiyo",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Eliptik",
    primaryMusclesLabel: "Bacak",
    keywords: ["eliptik", "elliptical", "cross trainer"],
  },
  {
    normalizedName: "Merdiven Çıkma",
    categoryLabel: "Kardiyo",
    intensityLabel: "Yüksek tempo",
    equipmentLabel: "Merdiven",
    primaryMusclesLabel: "Bacak",
    keywords: ["merdiven çıkma", "merdiven cikma", "stairs", "stair climber", "stairmaster"],
  },
];

function normalizeSearchValue(value = "") {
  return String(value ?? "").toLocaleLowerCase("tr-TR").trim();
}

function normalizeExerciseName(name = "") {
  const normalizedName = normalizeSearchValue(name);

  const matchedRule = NORMALIZED_EXERCISE_RULES.find((rule) =>
    rule.keywords.some((keyword) => normalizedName.includes(keyword))
  );

  return matchedRule?.normalizedName || "Diğer Egzersiz";
}

function getExercisePresentation(normalizedExerciseName) {
  const matchedRule = NORMALIZED_EXERCISE_RULES.find(
    (rule) => rule.normalizedName === normalizedExerciseName
  );

  if (matchedRule) {
    return {
      categoryLabel: matchedRule.categoryLabel,
      intensityLabel: matchedRule.intensityLabel,
      equipmentLabel: matchedRule.equipmentLabel,
      primaryMusclesLabel: matchedRule.primaryMusclesLabel,
    };
  }

  return {
    categoryLabel: "Genel",
    intensityLabel: "Orta tempo",
    equipmentLabel: "Ekipmansız",
    primaryMusclesLabel: "Tüm Vücut",
  };
}

function calculateExerciseCalories(exerciseName, durationMinutes) {
  const normalizedExerciseName = normalizeExerciseName(exerciseName);
  const caloriesPerMinute =
    EXERCISE_CALORIES_PER_MINUTE[normalizedExerciseName] ??
    EXERCISE_CALORIES_PER_MINUTE["Diğer Egzersiz"];

  return Math.round(caloriesPerMinute * durationMinutes);
}

function normalizeExercises(apiExercises = []) {
  const normalizedExerciseMap = new Map();

  apiExercises.forEach((apiExercise) => {
    const sourceName = apiExercise.sourceName || "";
    const normalizedExerciseName = normalizeExerciseName(sourceName);
    const presentation = getExercisePresentation(normalizedExerciseName);
    const caloriesPerMinute =
      EXERCISE_CALORIES_PER_MINUTE[normalizedExerciseName] ??
      EXERCISE_CALORIES_PER_MINUTE["Diğer Egzersiz"];

    if (!normalizedExerciseMap.has(normalizedExerciseName)) {
      normalizedExerciseMap.set(normalizedExerciseName, {
        id: `normalized-${normalizedExerciseName
          .toLocaleLowerCase("tr-TR")
          .replace(/\s+/g, "-")}`,
        name: normalizedExerciseName,
        categoryLabel: presentation.categoryLabel,
        intensityLabel: presentation.intensityLabel,
        caloriesPerMinute,
        equipmentLabel: presentation.equipmentLabel,
        primaryMusclesLabel: presentation.primaryMusclesLabel,
        description: `${normalizedExerciseName} için sadeleştirilmiş aktivite sonucu.`,
        rawTerms: new Set([
          normalizeSearchValue(sourceName),
          normalizeSearchValue(normalizedExerciseName),
        ]),
      });

      return;
    }

    normalizedExerciseMap
      .get(normalizedExerciseName)
      .rawTerms.add(normalizeSearchValue(sourceName));
  });

  return Array.from(normalizedExerciseMap.values()).map((exercise) => ({
    ...exercise,
    rawTerms: Array.from(exercise.rawTerms),
  }));
}


function buildGuaranteedExerciseCatalog() {
  return NORMALIZED_EXERCISE_RULES.map((rule) => ({
    id: `normalized-${rule.normalizedName
      .toLocaleLowerCase("tr-TR")
      .replace(/\s+/g, "-")}`,
    name: rule.normalizedName,
    categoryLabel: rule.categoryLabel,
    intensityLabel: rule.intensityLabel,
    caloriesPerMinute:
      EXERCISE_CALORIES_PER_MINUTE[rule.normalizedName] ??
      EXERCISE_CALORIES_PER_MINUTE["Diğer Egzersiz"],
    equipmentLabel: rule.equipmentLabel,
    primaryMusclesLabel: rule.primaryMusclesLabel,
    description: `${rule.normalizedName} için sadeleştirilmiş aktivite sonucu.`,
    rawTerms: Array.from(
      new Set([
        normalizeSearchValue(rule.normalizedName),
        ...rule.keywords.map((keyword) => normalizeSearchValue(keyword)),
      ])
    ),
  }));
}

module.exports = {
  EXERCISE_CALORIES_PER_MINUTE,
  buildGuaranteedExerciseCatalog,
  normalizeSearchValue,
  normalizeExerciseName,
  normalizeExercises,
  calculateExerciseCalories,
};
