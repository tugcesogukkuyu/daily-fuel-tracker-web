import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMeal } from "../../../services/mealService";
import { searchFoods } from "../../../services/foodService";




const MEAL_TYPE_OPTIONS = [
  "Kahvaltı",
  "Öğle Yemeği",
  "Akşam Yemeği",
  "Ara Öğün",
];



function getSelectedFood(foodList, foodId) {
  return foodList.find((food) => String(food.id) === String(foodId)) ?? null;
}


function calculateNutritionTotals(food, servingCount) {
  if (!food) {
    return {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
    };
  }

  return {
    totalCalories: food.calories * servingCount,
    totalProtein: food.protein * servingCount,
    totalCarbs: food.carbs * servingCount,
    totalFat: food.fat * servingCount,
  };
}


function MealEntryForm({ onSuccess, onCancel, mode = "page" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [foodOptions, setFoodOptions] = useState([]);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [servingCount, setServingCount] = useState(1);
  const [selectedMealType, setSelectedMealType] = useState("Öğle Yemeği");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [isLoadingFoods, setIsLoadingFoods] = useState(false);


  
  useEffect(() => {
    let isCurrentRequest = true;

    const loadFoodOptions = async () => {
      const normalizedSearchTerm = searchTerm.trim();

      if (normalizedSearchTerm.length < 2) {
        setFoodOptions([]);
        setSelectedFoodId(null);
        return;
      }

      try {
        setIsLoadingFoods(true);

        const response = await searchFoods(normalizedSearchTerm);

        if (!isCurrentRequest) {
          return;
        }

        const nextFoodOptions = response.data ?? [];

        setFoodOptions(nextFoodOptions);
        setSelectedFoodId((currentSelectedFoodId) => {
          if (
            currentSelectedFoodId &&
            nextFoodOptions.some(
              (food) => String(food.id) === String(currentSelectedFoodId)
            )
          ) {
            return currentSelectedFoodId;
          }

          return nextFoodOptions[0]?.id ?? null;
        });
      } catch (error) {
        if (!isCurrentRequest) {
          return;
        }

        setFoodOptions([]);
        setSelectedFoodId(null);
      } finally {
        if (isCurrentRequest) {
          setIsLoadingFoods(false);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      loadFoodOptions();
    }, 250);

    return () => {
      isCurrentRequest = false;
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);




  const selectedFood = useMemo(() => {
    return getSelectedFood(foodOptions, selectedFoodId);
  }, [foodOptions, selectedFoodId]);


  const { totalCalories, totalProtein, totalCarbs, totalFat } =
    calculateNutritionTotals(selectedFood, servingCount);

  const handleAddMeal = async () => {
    if (!selectedFood) {
      setIsErrorMessage(true);
      setFeedbackMessage("Önce bir yemek seçmelisin.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await createMeal({
        name: selectedFood.name,
        mealType: selectedMealType,
        calories: totalCalories,
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat,
      });

      setIsErrorMessage(false);
      setFeedbackMessage(response.message || "Öğün başarıyla eklendi.");

      setServingCount(1);

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 450);
      }
    } catch (error) {
      if (error.message === "Authentication required") {
        setIsErrorMessage(true);
        setFeedbackMessage("Giriş yapmalısın. Giriş ekranına yönlendiriliyorsun...");

        setTimeout(() => {
          navigate("/login");
        }, 900);

        return;
      }

      setIsErrorMessage(true);
      setFeedbackMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`meal-entry-form meal-entry-form-${mode}`}>
      <div className="meal-layout meal-layout-drawer">
        <div className="meal-search-panel">
          <h2>Yemek Ara</h2>

          <input
            type="text"
            placeholder="Yemek ara..."
            className="meal-search-input"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

            <div className="food-list">
            {isLoadingFoods && (
              <p className="section-helper-text">Yemekler yükleniyor...</p>
            )}

            {!isLoadingFoods && searchTerm.trim().length >= 2 && foodOptions.length === 0 && (
              <p className="section-helper-text">
                Aramaya uygun yemek bulunamadı.
              </p>
            )}

            {foodOptions.map((food) => {

              const isSelectedFood = selectedFoodId === food.id;

              return (
                <button
                  key={food.id}
                  type="button"
                  className={`food-item ${isSelectedFood ? "active-food" : ""}`}
                  onClick={() => setSelectedFoodId(food.id)}
                >
                  <div>
                    <h3>{food.name}</h3>
                    <p>{food.serving_label}</p>
                  </div>
                  <strong>{food.calories} cal</strong>
                </button>
              );
            })}
          </div>
        </div>

        <div className="meal-detail-panel">
          <h2>Besin Detayları</h2>

          <div className="selected-food-box">
            <h3>{selectedFood?.name || "Yemek seçilmedi"}</h3>
            <p>{selectedFood?.serving_label || "En az 2 harf yazarak yemek ara"}</p>
          </div>


          <label className="detail-label">Porsiyon Sayısı</label>

          <div className="serving-control">
            <button
              type="button"
              className="serving-button"
              onClick={() => setServingCount((count) => Math.max(1, count - 1))}
            >
              -
            </button>

            <div className="serving-box">{servingCount}</div>

            <button
              type="button"
              className="serving-button"
              onClick={() => setServingCount((count) => count + 1)}
            >
              +
            </button>
          </div>

          <div className="calorie-box">
            <span>Toplam Kalori</span>
            <strong>{totalCalories} kcal</strong>
          </div>

          <div className="macro-boxes">
            <div className="mini-macro-card">
              <span>Protein</span>
              <strong>{totalProtein}g</strong>
            </div>

            <div className="mini-macro-card">
              <span>Karbonhidrat</span>
              <strong>{totalCarbs}g</strong>
            </div>

            <div className="mini-macro-card">
              <span>Yağ</span>
              <strong>{totalFat}g</strong>
            </div>
          </div>

          <label className="detail-label">Öğün Türü</label>

          <div className="meal-type-grid">
            {MEAL_TYPE_OPTIONS.map((mealType) => (
              <button
                key={mealType}
                type="button"
                className={selectedMealType === mealType ? "active-meal-type" : ""}
                onClick={() => setSelectedMealType(mealType)}
              >
                {mealType}
              </button>
            ))}
          </div>

          {feedbackMessage && (
            <p className={isErrorMessage ? "auth-error-message" : "auth-success-message"}>
              {feedbackMessage}
            </p>
          )}

          <div className="meal-entry-actions">
            {onCancel && (
              <button
                type="button"
                className="meal-entry-cancel-button"
                onClick={onCancel}
              >
                Vazgeç
              </button>
            )}

            <button
              type="button"
              className="auth-button meal-entry-submit-button"
              onClick={handleAddMeal}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Ekleniyor..." : "Bugünkü Öğünlere Ekle"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealEntryForm;
