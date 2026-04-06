const {
  normalizeSearchValue,
  normalizeExerciseName,
  normalizeExercises,
  buildGuaranteedExerciseCatalog,
} = require("../utils/exerciseCatalogHelpers");

const WGER_EXERCISE_API_URL =
  "https://wger.de/api/v2/exerciseinfo/?limit=1000&offset=0&language=2";
const EXERCISE_CATALOG_CACHE_TTL_IN_MS = 1000 * 60 * 60;
const MINIMUM_SEARCH_TERM_LENGTH = 2;
const DEFAULT_RESULT_LIMIT = 24;

let cachedExerciseCatalog = [];
let lastExerciseCatalogFetchTimestamp = 0;

/*
  Search matcher
  Yazilan degerin kelime baslangiclarina gore eslesme kontrolu yapar.
*/
function matchesExerciseSearch(searchValue, normalizedSearchTerm) {
  const normalizedSearchValue = normalizeSearchValue(searchValue);

  if (normalizedSearchValue.startsWith(normalizedSearchTerm)) {
    return true;
  }

  return normalizedSearchValue
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .some((searchWord) => searchWord.startsWith(normalizedSearchTerm));
}

/*
  Catalog fetcher
  wger API'den egzersiz listesini alir ve arama icin sade veri yapisina indirger.
*/
async function fetchExerciseCatalogFromApi() {
  const apiResponse = await fetch(WGER_EXERCISE_API_URL, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!apiResponse.ok) {
    throw new Error("Exercise catalog could not be fetched from wger API.");
  }

  const responseData = await apiResponse.json();

  return (responseData.results ?? []).map((exerciseInfo) => {
    const englishTranslation = (exerciseInfo.translations ?? []).find(
      (translation) => translation.language === 2
    );
    const fallbackTranslation = exerciseInfo.translations?.[0] ?? null;
    const selectedTranslation = englishTranslation || fallbackTranslation;

    return {
      id: exerciseInfo.id,
      sourceName: selectedTranslation?.name || `Exercise ${exerciseInfo.id}`,
      sourceDescription: selectedTranslation?.description || "",
      sourceCategory: exerciseInfo.category?.name || "",
    };
  });
}

/*
  Cached catalog getter
  Dis API'ye gereksiz tekrar gitmemek icin katalog verisini cache'ler.
*/
async function getExerciseCatalog() {
  const now = Date.now();
  const shouldReuseCache =
    cachedExerciseCatalog.length > 0 &&
    now - lastExerciseCatalogFetchTimestamp < EXERCISE_CATALOG_CACHE_TTL_IN_MS;

  if (shouldReuseCache) {
    return cachedExerciseCatalog;
  }

  const apiExercises = await fetchExerciseCatalogFromApi();
  const normalizedExerciseCatalog = normalizeExercises(apiExercises);
  const guaranteedExerciseCatalog = buildGuaranteedExerciseCatalog();
  const mergedExerciseCatalog = new Map();

  [...guaranteedExerciseCatalog, ...normalizedExerciseCatalog].forEach((exerciseItem) => {
    mergedExerciseCatalog.set(exerciseItem.name, exerciseItem);
  });

  cachedExerciseCatalog = Array.from(mergedExerciseCatalog.values());
  lastExerciseCatalogFetchTimestamp = now;

  return cachedExerciseCatalog;
}

/*
  Catalog search
  Normalize edilmis Turkce aktivite listesini arama kutusu icin dondurur.
*/
async function searchExerciseCatalog(searchTerm) {
  const normalizedSearchTerm = normalizeSearchValue(searchTerm);

  if (normalizedSearchTerm.length < MINIMUM_SEARCH_TERM_LENGTH) {
    return [];
  }

  const exerciseCatalog = await getExerciseCatalog();
  const normalizedSearchLabel = normalizeExerciseName(searchTerm);

  const matchingExercises = exerciseCatalog
    .filter((exerciseCatalogItem) => {
      const normalizedExerciseName = normalizeSearchValue(exerciseCatalogItem.name);

      if (matchesExerciseSearch(normalizedExerciseName, normalizedSearchTerm)) {
        return true;
      }

      return exerciseCatalogItem.name === normalizedSearchLabel;
    })
    .sort((firstExercise, secondExercise) =>
      firstExercise.name.localeCompare(secondExercise.name, "tr")
    );

  const preferredExercises = matchingExercises.filter(
    (exerciseCatalogItem) => exerciseCatalogItem.name !== "Diğer Egzersiz"
  );
  const exercisesToReturn =
    preferredExercises.length > 0 ? preferredExercises : matchingExercises;

  return exercisesToReturn
    .slice(0, DEFAULT_RESULT_LIMIT)
    .map(({ rawTerms, ...exerciseCatalogItem }) => exerciseCatalogItem);
}

module.exports = {
  searchExerciseCatalog,
};
