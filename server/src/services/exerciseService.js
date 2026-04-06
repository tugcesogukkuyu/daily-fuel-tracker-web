const {
    findAllExercises,
    createExercise,
    deleteExerciseById,
  } = require("../repositories/exerciseRepository");
  
  /*
    Get exercise list
    Tum egzersiz kayitlarini veritabanindan getirir.
  */
  const getExerciseList = async () => {
    const exerciseList = await findAllExercises();
  
    return exerciseList;
  };
  
  /*
    Create exercise record
    Yeni egzersiz kaydini veritabanina ekler.
  */
  const createExerciseRecord = async ({
    userId,
    name,
    durationMinutes,
    caloriesBurned,
  }) => {
    const createdExercise = await createExercise({
      userId,
      name,
      durationMinutes,
      caloriesBurned,
    });
  
    return createdExercise;
  };
  
  /*
  Delete exercise record
  Egzersiz kaydini id ile siler.
  */
  const deleteExerciseRecord = async (exerciseId) => {
  const deletedExercise = await deleteExerciseById(exerciseId);

  return deletedExercise;
};
 

  module.exports = {
    getExerciseList,
    createExerciseRecord,
    deleteExerciseRecord,
  };
  