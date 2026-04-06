const {
    findAllFoods,
    findFoodsBySearchTerm,
  } = require("../repositories/foodRepository");
  
  /**
   * Food service
   * Besin arama ve listeleme mantigini burada toplariz.
   */
  
  /**
   * Tüm besinleri getirir.
   */
  const getFoodList = async () => {
    return await findAllFoods();
  };
  
  /**
   * Arama metnine göre besinleri getirir.
   */
  const searchFoodList = async (searchTerm) => {
    const normalizedSearchTerm = searchTerm?.trim();
  
    if (!normalizedSearchTerm) {
      return await findAllFoods();
    }
  
    return await findFoodsBySearchTerm(normalizedSearchTerm);
  };
  
  module.exports = {
    getFoodList,
    searchFoodList,
  };
  