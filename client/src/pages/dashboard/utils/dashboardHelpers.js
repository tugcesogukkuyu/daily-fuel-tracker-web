import waterBottle0 from "../../../assets/images/water-bottle-0.png";
import waterBottle25 from "../../../assets/images/water-bottle-25.png";
import waterBottle50 from "../../../assets/images/water-bottle-50.png";
import waterBottle75 from "../../../assets/images/water-bottle-75.png";
import waterBottle100 from "../../../assets/images/water-bottle-100.png";
import {
  DASHBOARD_DAY_DETAILS_BY_DAY,
  DASHBOARD_SUMMARY_BY_DAY,
  EMPTY_DASHBOARD_DAY_DETAILS,
  EMPTY_DASHBOARD_SUMMARY,
} from "../constants/dashboardData";

/**
 * İçilen bardak sayısına göre uygun şişe görselini seçer.
 * Görsel eşiklerini JSX içine gömmek yerine burada topluyoruz.
 */
export function getWaterBottleImage(filledCupCount) {
  if (filledCupCount >= 9) {
    return waterBottle100;
  }

  if (filledCupCount >= 6) {
    return waterBottle75;
  }

  if (filledCupCount >= 3) {
    return waterBottle50;
  }

  if (filledCupCount >= 1) {
    return waterBottle25;
  }

  return waterBottle0;
}

/**
 * Seçilen güne ait öğün ve egzersiz detaylarını döndürür.
 * Veri yoksa boş yapı vererek component akışını güvenli tutar.
 */
export function getDashboardDayDetails(selectedDay) {
  return DASHBOARD_DAY_DETAILS_BY_DAY[selectedDay] ?? EMPTY_DASHBOARD_DAY_DETAILS;
}

/**
 * Seçilen güne ait kısa özet kalori verisini döndürür.
 * Özet kartları ve mini takvim altındaki bilgi alanı bunu kullanır.
 */
export function getDashboardDaySummary(selectedDay) {
  return DASHBOARD_SUMMARY_BY_DAY[selectedDay] ?? EMPTY_DASHBOARD_SUMMARY;
}
