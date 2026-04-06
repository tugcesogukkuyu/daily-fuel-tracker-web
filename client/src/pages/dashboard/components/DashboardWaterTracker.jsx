import waterCupEmpty from "../../../assets/images/water-cup-empty.png";
import waterCupFilled from "../../../assets/images/water-cup-filled.png";

const TARGET_CUP_COUNT = 10;
const CUP_ML_AMOUNT = 200;

/**
 * Bardak sayısına göre kısa motive edici durum mesajını döndürür.
 */
function getWaterStatusMessage(filledCupCount) {
  if (filledCupCount >= TARGET_CUP_COUNT) {
    return "Harika, günlük hedef tamamlandı.";
  }

  if (filledCupCount === TARGET_CUP_COUNT - 1) {
    return "Bir bardak daha iç.";
  }

  if (filledCupCount >= 6) {
    return "Hedefe yaklaştın.";
  }

  if (filledCupCount >= 3) {
    return "İyi gidiyorsun.";
  }

  return "Hadi başlayalım.";
}

/**
 * Günlük su takibi alanını gösterir.
 * Bardak seçimiyle doluluk görseli ve ilerleme bilgisi güncellenir.
 */
function DashboardWaterTracker({ filledCupCount, onSelectCupCount }) {
  const filledCupPercentage = (filledCupCount / TARGET_CUP_COUNT) * 100;
  const consumedMilliliters = filledCupCount * CUP_ML_AMOUNT;
  const consumedLitersLabel = (consumedMilliliters / 1000).toFixed(1);
  const targetLitersLabel = (TARGET_CUP_COUNT * CUP_ML_AMOUNT / 1000).toFixed(1);
  const waterStatusMessage = getWaterStatusMessage(filledCupCount);

  return (
    <div className="water-section">
      <div className="water-section-header">
        <div>
          <h2>Su Takibi</h2>
          <p className="water-section-caption">1 bardak = 200 ml</p>
        </div>

        <div className="water-section-total">
          <strong>{consumedLitersLabel} / {targetLitersLabel} L</strong>
          <span>{filledCupCount} / {TARGET_CUP_COUNT} bardak</span>
        </div>
      </div>

      <div className="water-progress-track">
        <div
          className="water-progress-fill"
          style={{ width: `${filledCupPercentage}%` }}
        />
      </div>

      <p className="water-status-text">{waterStatusMessage}</p>

      <div className="cup-grid">
        {Array.from({ length: TARGET_CUP_COUNT }, (_, cupIndex) => {
          const cupNumber = cupIndex + 1;
          const isCupFilled = filledCupCount >= cupNumber;

          return (
            <button
              key={cupNumber}
              type="button"
              className="cup-button-image"
              onClick={() => onSelectCupCount(cupNumber)}
            >
              <img
                src={isCupFilled ? waterCupFilled : waterCupEmpty}
                alt={`Bardak ${cupNumber}`}
                className="cup-image"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardWaterTracker;
