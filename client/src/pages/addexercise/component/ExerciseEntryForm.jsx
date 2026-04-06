import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createExercise,
  searchExerciseCatalog,
} from "../../../services/exerciseService";

const QUICK_DURATION_OPTIONS = [15, 30, 45, 60];

/*
  Activity selector helper
  Secili aktiviteyi id uzerinden guvenli sekilde bulur.
*/
function getSelectedActivity(activityOptions, selectedActivityId) {
  return (
    activityOptions.find(
      (activityOption) => String(activityOption.id) === String(selectedActivityId)
    ) ?? null
  );
}

/*
  Exercise total calculator
  Sureye gore yakilan toplam kaloriyi hesaplar.
*/
function calculateExerciseTotals(selectedActivity, durationMinutes) {
  if (!selectedActivity) {
    return {
      totalCaloriesBurned: 0,
    };
  }

  return {
    totalCaloriesBurned: Math.round(
      selectedActivity.caloriesPerMinute * durationMinutes
    ),
  };
}

/*
  Exercise entry form
  Meal formundaki akisla benzer sekilde arama, secim, detay ve kaydetme alanlarini yonetir.
*/
function ExerciseEntryForm({ onSuccess, onCancel, mode = "drawer" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activityOptions, setActivityOptions] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const normalizedSearchTerm = searchTerm.trim();

    if (normalizedSearchTerm.length < 2) {
      setActivityOptions([]);
      setSelectedActivityId(null);
      return undefined;
    }

    let shouldIgnoreResponse = false;

    const searchTimeoutId = setTimeout(async () => {
      try {
        setIsLoadingActivities(true);

        const response = await searchExerciseCatalog(normalizedSearchTerm);
        const nextActivityOptions = response.data ?? [];

        if (shouldIgnoreResponse) {
          return;
        }

        setActivityOptions(nextActivityOptions);
        setSelectedActivityId((currentSelectedActivityId) => {
          if (
            currentSelectedActivityId &&
            nextActivityOptions.some(
              (activityOption) =>
                String(activityOption.id) === String(currentSelectedActivityId)
            )
          ) {
            return currentSelectedActivityId;
          }

          return nextActivityOptions[0]?.id ?? null;
        });
      } catch (error) {
        if (shouldIgnoreResponse) {
          return;
        }

        setActivityOptions([]);
        setSelectedActivityId(null);
        setIsErrorMessage(true);
        setFeedbackMessage(error.message);
      } finally {
        if (!shouldIgnoreResponse) {
          setIsLoadingActivities(false);
        }
      }
    }, 250);

    return () => {
      shouldIgnoreResponse = true;
      clearTimeout(searchTimeoutId);
    };
  }, [searchTerm]);

  const selectedActivity = useMemo(() => {
    return getSelectedActivity(activityOptions, selectedActivityId);
  }, [activityOptions, selectedActivityId]);

  const { totalCaloriesBurned } = calculateExerciseTotals(
    selectedActivity,
    durationMinutes
  );

  /*
    Exercise create handler
    Secili aktivite ve sure bilgisini backend'e gonderir.
  */
  const handleAddExercise = async () => {
    if (!selectedActivity) {
      setIsErrorMessage(true);
      setFeedbackMessage("Önce bir aktivite seçmelisin.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await createExercise({
        name: selectedActivity.name,
        durationMinutes,
        caloriesBurned: totalCaloriesBurned,
      });

      setIsErrorMessage(false);
      setFeedbackMessage(response.message || "Egzersiz başarıyla eklendi.");

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
    <div className={`exercise-entry-form exercise-entry-form-${mode}`}>
      <div className="meal-layout exercise-layout-drawer">
        <div className="meal-search-panel exercise-search-panel">
          <h2>Aktivite Ara</h2>

          <input
            type="text"
            placeholder="Aktivite ara..."
            className="meal-search-input"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setFeedbackMessage("");
            }}
          />

          <div className="food-list activity-list">
            {searchTerm.trim().length < 2 && (
              <p className="section-helper-text">
                En az 2 harf yazarak aktivite ara.
              </p>
            )}

            {isLoadingActivities && (
              <p className="section-helper-text">Aktiviteler yükleniyor...</p>
            )}

            {!isLoadingActivities &&
              searchTerm.trim().length >= 2 &&
              activityOptions.length === 0 && (
                <p className="section-helper-text">
                  Aramaya uygun aktivite bulunamadı.
                </p>
              )}

            {activityOptions.map((activityOption) => {
              const isSelectedActivity =
                String(selectedActivity?.id) === String(activityOption.id);

              return (
                <button
                  key={activityOption.id}
                  type="button"
                  className={`food-item activity-item ${
                    isSelectedActivity ? "active-food active-activity" : ""
                  }`}
                  onClick={() => setSelectedActivityId(activityOption.id)}
                >
                  <div>
                    <h3>{activityOption.name}</h3>
                    <p>{activityOption.categoryLabel}</p>
                  </div>

                  <strong>{activityOption.caloriesPerMinute} kal/dk</strong>
                </button>
              );
            })}
          </div>
        </div>

        <div className="meal-detail-panel exercise-detail-panel">
          <h2>Aktivite Detayları</h2>

          <div className="selected-food-box selected-activity-box">
            <h3>{selectedActivity?.name || "Aktivite seçilmedi"}</h3>
            <p>
              {selectedActivity
                ? `${selectedActivity.categoryLabel} • ${selectedActivity.intensityLabel}`
                : "Listeden bir aktivite seçebilirsin"}
            </p>
          </div>

          <label className="detail-label">Süre (dakika)</label>

          <div className="serving-control">
            <button
              type="button"
              className="serving-button"
              onClick={() =>
                setDurationMinutes((currentDuration) => Math.max(5, currentDuration - 5))
              }
            >
              -
            </button>

            <div className="serving-box">{durationMinutes}</div>

            <button
              type="button"
              className="serving-button"
              onClick={() => setDurationMinutes((currentDuration) => currentDuration + 5)}
            >
              +
            </button>
          </div>

          <div className="quick-time-grid meal-type-grid">
            {QUICK_DURATION_OPTIONS.map((durationOption) => (
              <button
                key={durationOption}
                type="button"
                className={durationMinutes === durationOption ? "active-time" : ""}
                onClick={() => setDurationMinutes(durationOption)}
              >
                {durationOption} dk
              </button>
            ))}
          </div>

          <div className="calorie-box exercise-calorie-box">
            <span>Yakılan Kalori</span>
            <strong>{totalCaloriesBurned} kcal</strong>
          </div>

          <div className="macro-boxes exercise-meta-boxes">
            <div className="mini-macro-card">
              <span>Kategori</span>
              <strong>{selectedActivity?.categoryLabel || "-"}</strong>
            </div>

            <div className="mini-macro-card">
              <span>Süre</span>
              <strong>{durationMinutes} dk</strong>
            </div>

            <div className="mini-macro-card">
              <span>Yakım</span>
              <strong>{selectedActivity?.caloriesPerMinute || 0} kal/dk</strong>
            </div>
          </div>

          {selectedActivity && (
            <div className="exercise-detail-summary">
              <p>
                <strong>Ekipman:</strong> {selectedActivity.equipmentLabel}
              </p>
              <p>
                <strong>Kas Grubu:</strong> {selectedActivity.primaryMusclesLabel}
              </p>
            </div>
          )}

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
              className="exercise-action-button meal-entry-submit-button"
              onClick={handleAddExercise}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Ekleniyor..." : "Bugünkü Egzersizlere Ekle"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseEntryForm;
