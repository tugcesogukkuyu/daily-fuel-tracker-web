const {
    getFoodList,
    searchFoodList,
  } = require("../services/foodService");
  
  /**
   * Food controller
   * Besin listeleme ve arama endpointlerini burada yonetiriz.
   */
  
  /**
   * Tüm besinleri döner.
   */
  const getFoods = async (request, response) => {
    try {
      const foods = await getFoodList();
  
      response.status(200).json({
        success: true,
        data: foods,
      });
    } catch (error) {
      console.error("Besinler alınamadı:", error);
  
      response.status(500).json({
        success: false,
        message: "Besinler alınırken bir hata oluştu.",
      });
    }
  };
  
  /**
   * Arama metnine göre besinleri döner.
   */
  const searchFoods = async (request, response) => {
    try {
      const { q = "" } = request.query;
      const foods = await searchFoodList(q);
  
      response.status(200).json({
        success: true,
        data: foods,
      });
    } catch (error) {
      console.error("Besin araması başarısız:", error);
  
      response.status(500).json({
        success: false,
        message: "Besin araması sırasında bir hata oluştu.",
      });
    }
  };
  
  module.exports = {
    getFoods,
    searchFoods,
  };
  