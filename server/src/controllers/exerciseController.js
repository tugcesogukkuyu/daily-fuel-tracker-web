const {
  getExerciseList,
  createExerciseRecord,
  deleteExerciseRecord,
} = require("../services/exerciseService");
const {
  searchExerciseCatalog,
} = require("../services/exerciseCatalogService");

/*
  Get exercises
  Tum egzersiz kayitlarini listelemek icin kullanilir.
*/
const getExercises = async (request, response) => {
  try {
    const exerciseList = await getExerciseList();

    response.json({
      message: "Exercises fetched successfully",
      data: exerciseList,
    });
  } catch (error) {
    response.status(500).json({
      message: "Failed to fetch exercises",
      error: error.message,
    });
  }
};

/*
  Search exercise catalog
  Dis API'den gelen egzersiz katalog verisini drawer aramasi icin dondurur.
*/
const getExerciseCatalogSearchResults = async (request, response) => {
  try {
    const { q = "" } = request.query;
    const exerciseCatalog = await searchExerciseCatalog(q);

    response.status(200).json({
      success: true,
      data: exerciseCatalog,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Egzersiz kataloğu alınırken bir hata oluştu.",
      error: error.message,
    });
  }
};

/*
  Create exercise
  Yeni egzersiz kaydi olusturur.
*/
const createExercise = async (request, response) => {
  try {
    const { name, durationMinutes, caloriesBurned } = request.body;
    const userId = request.authenticatedUser.id;

    if (!name || durationMinutes === undefined || caloriesBurned === undefined) {
      return response.status(400).json({
        message: "Name, duration minutes and calories burned are required",
      });
    }

    const createdExercise = await createExerciseRecord({
      userId,
      name,
      durationMinutes,
      caloriesBurned,
    });

    response.status(201).json({
      message: "Exercise created successfully",
      data: createdExercise,
    });
  } catch (error) {
    response.status(500).json({
      message: "Failed to create exercise",
      error: error.message,
    });
  }
};

/*
  Delete exercise
  Verilen id'ye sahip egzersiz kaydini siler.
*/
const deleteExercise = async (request, response) => {
  try {
    const exerciseId = Number(request.params.id);

    if (!exerciseId) {
      return response.status(400).json({
        message: "Exercise id is required",
      });
    }

    const deletedExercise = await deleteExerciseRecord(exerciseId);

    if (!deletedExercise) {
      return response.status(404).json({
        message: "Exercise not found",
      });
    }

    response.json({
      message: "Exercise deleted successfully",
      data: deletedExercise,
    });
  } catch (error) {
    response.status(500).json({
      message: "Failed to delete exercise",
      error: error.message,
    });
  }
};

module.exports = {
  getExercises,
  getExerciseCatalogSearchResults,
  createExercise,
  deleteExercise,
};
