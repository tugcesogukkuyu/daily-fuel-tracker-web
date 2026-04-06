import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHero from "./components/DashboardHero";
import DashboardNavbar from "./components/DashboardNavbar";
import DashboardSummarySection from "./components/DashboardSummarySection";
import DashboardMacrosSection from "./components/DashboardMacrosSection";
import DashboardMobileOverview from "./components/DashboardMobileOverview";
import DashboardMealsSection from "./components/DashboardMealsSection";
import DashboardExercisesSection from "./components/DashboardExercisesSection";
import DashboardMiniCalendar from "./components/DashboardMiniCalendar";
import DashboardWaterTracker from "./components/DashboardWaterTracker";
import DashboardBlogPreview from "./components/DashboardBlogPreview";
import MealEntryDrawer from "./components/MealEntryDrawer";
import ExerciseEntryDrawer from "./components/ExerciseEntryDrawer";
import DashboardAccountModal from "./components/DashboardAccountModal";
import {
  getAuthenticatedUser,
  logoutUser,
} from "../../services/authService";
import {
  deleteMeal,
  getMeals,
} from "../../services/mealService";
import {
  deleteExercise,
  getExercises,
} from "../../services/exerciseService";
import {
  getWaterLog,
  saveWaterLog,
} from "../../services/waterService";

/*
  Local date key formatter
  Secili tarihi UTC kaymasina dusmeden YYYY-MM-DD formatina cevirir.
*/
function formatLocalDateKey(dateValue) {
  const date = new Date(dateValue);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/*
  Dashboard page
  Auth durumu, secili tarih ve o tarihe ait tum dashboard verileri burada yonetilir.
*/
function DashboardPage() {
  /*
    Page state
    Kullanici, secili tarih, kayitlar ve UI overlay durumlarini tutar.
  */
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [mealRecords, setMealRecords] = useState([]);
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [filledCupCount, setFilledCupCount] = useState(0);
  const [isMealDrawerOpen, setIsMealDrawerOpen] = useState(false);
  const [isExerciseDrawerOpen, setIsExerciseDrawerOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountModalView, setAccountModalView] = useState("account");
  const navigate = useNavigate();

  const selectedDateKey = formatLocalDateKey(selectedDate);

  /*
    Dashboard loader
    Giris yapan kullanicinin secili tarihe bagli verilerini backend'den alir.
  */
  const loadDashboardRecords = async () => {
    try {
      let authenticatedUser = null;

      try {
        const authenticatedUserResponse = await getAuthenticatedUser();
        authenticatedUser = authenticatedUserResponse.data;
      } catch (error) {
        setCurrentUser(null);
        setMealRecords([]);
        setExerciseRecords([]);
        setFilledCupCount(0);
        return;
      }

      setCurrentUser(authenticatedUser);

      const mealResponse = await getMeals();
      const exerciseResponse = await getExercises();
      const waterResponse = await getWaterLog({
        logDate: selectedDateKey,
      });

      const currentUserMeals = (mealResponse.data ?? []).filter(
        (meal) => meal.user_id === authenticatedUser.id
      );

      const currentUserExercises = (exerciseResponse.data ?? []).filter(
        (exercise) => exercise.user_id === authenticatedUser.id
      );

      setMealRecords(currentUserMeals);
      setExerciseRecords(currentUserExercises);
      setFilledCupCount(waterResponse.data?.cup_count ?? 0);
    } catch (error) {
      console.error("Dashboard verileri alınamadı:", error);
    }
  };

  useEffect(() => {
    loadDashboardRecords();
  }, [selectedDate]);

  useEffect(() => {
    if (!isAccountMenuOpen) {
      return undefined;
    }

    const handleOutsideClose = () => {
      setIsAccountMenuOpen(false);
    };

    window.addEventListener("click", handleOutsideClose);

    return () => {
      window.removeEventListener("click", handleOutsideClose);
    };
  }, [isAccountMenuOpen]);

  /*
    Logout handler
    Oturumu kapatir ve dashboard state'ini sifirlar.
  */
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Çıkış yapılamadı:", error);
    }

    setCurrentUser(null);
    setMealRecords([]);
    setExerciseRecords([]);
    setFilledCupCount(0);
    setIsAccountMenuOpen(false);
    setIsAccountModalOpen(false);
    navigate("/login");
  };

  const handleToggleAccountMenu = (event) => {
    event.stopPropagation();
    setIsAccountMenuOpen((isOpen) => !isOpen);
  };

  const handleOpenAccountModal = () => {
    setIsAccountMenuOpen(false);
    setAccountModalView("account");
    setIsAccountModalOpen(true);
  };

  const handleOpenPasswordModal = () => {
    setIsAccountMenuOpen(false);
    setAccountModalView("password");
    setIsAccountModalOpen(true);
  };

  const handleAccountDeleted = () => {
    setCurrentUser(null);
    setMealRecords([]);
    setExerciseRecords([]);
    setFilledCupCount(0);
    setIsAccountModalOpen(false);
    navigate("/register");
  };

  const handleSelectDashboardDate = (nextSelectedDate) => {
    setSelectedDate(nextSelectedDate);
  };

  /*
    Selected day records
    Secili gunun ogun ve egzersiz kayitlarini dashboard icin ayirir.
  */
  const selectedDayMealRecords = mealRecords.filter((meal) => {
    const mealDate = new Date(meal.created_at);

    return (
      mealDate.getDate() === selectedDate.getDate() &&
      mealDate.getMonth() === selectedDate.getMonth() &&
      mealDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const selectedDayExerciseRecords = exerciseRecords.filter((exercise) => {
    const exerciseDate = new Date(exercise.created_at);

    return (
      exerciseDate.getDate() === selectedDate.getDate() &&
      exerciseDate.getMonth() === selectedDate.getMonth() &&
      exerciseDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  /*
    Summary calculations
    Secili gun ozetlerini gercek kayitlardan hesaplar.
  */
  const consumedCalories = selectedDayMealRecords.reduce(
    (totalCalories, meal) => totalCalories + meal.calories,
    0
  );

  const burnedCalories = selectedDayExerciseRecords.reduce(
    (totalCalories, exercise) => totalCalories + exercise.calories_burned,
    0
  );

  const netCalories = consumedCalories - burnedCalories;

  const proteinTotal = selectedDayMealRecords.reduce(
    (totalProtein, meal) => totalProtein + meal.protein,
    0
  );

  const carbsTotal = selectedDayMealRecords.reduce(
    (totalCarbs, meal) => totalCarbs + meal.carbs,
    0
  );

  const fatTotal = selectedDayMealRecords.reduce(
    (totalFat, meal) => totalFat + meal.fat,
    0
  );

  /*
    Delete handlers
    Kullanicinin kendi kayitlarini siler ve dashboard'u yeniler.
  */
  const handleDeleteMeal = async (mealId) => {
    try {
      await deleteMeal(mealId);
      await loadDashboardRecords();
    } catch (error) {
      console.error("Öğün silinemedi:", error);
    }
  };

  const handleDeleteExercise = async (exerciseId) => {
    try {
      await deleteExercise(exerciseId);
      await loadDashboardRecords();
    } catch (error) {
      console.error("Egzersiz silinemedi:", error);
    }
  };

  /*
    Water handler
    Bardak secimini backend'e yazar; misafir kullanicida sadece local state degisir.
  */
  const handleSelectCupCount = async (selectedCupCount) => {
    const nextCupCount =
      filledCupCount === selectedCupCount
        ? selectedCupCount - 1
        : selectedCupCount;

    if (!currentUser) {
      setFilledCupCount(nextCupCount);
      return;
    }

    try {
      await saveWaterLog({
        logDate: selectedDateKey,
        cupCount: nextCupCount,
      });

      setFilledCupCount(nextCupCount);
    } catch (error) {
      console.error("Su kaydı güncellenemedi:", error);
    }
  };

  /*
    Section data mapping
    Dashboard kartlarinin bekledigi gorunum formatini olusturur.
  */
  const dashboardMealItems = selectedDayMealRecords.map((meal) => ({
    id: meal.id,
    name: meal.name,
    calories: meal.calories,
    protein: meal.protein,
    carbs: meal.carbs,
    fat: meal.fat,
  }));

  const dashboardExerciseItems = selectedDayExerciseRecords.map((exercise) => ({
    id: exercise.id,
    name: exercise.name,
    calories: exercise.calories_burned,
    durationMinutes: exercise.duration_minutes,
  }));

  return (
    <main className="dashboard-page">
      <DashboardHero
        currentUser={currentUser}
        isAccountMenuOpen={isAccountMenuOpen}
        onToggleAccountMenu={handleToggleAccountMenu}
        onOpenAccountModal={handleOpenAccountModal}
        onOpenPasswordModal={handleOpenPasswordModal}
        onLogout={handleLogout}
      />
      <DashboardNavbar
        onOpenMealDrawer={() => setIsMealDrawerOpen(true)}
        onOpenExerciseDrawer={() => setIsExerciseDrawerOpen(true)}
      />

      <DashboardMobileOverview
        consumedCalories={consumedCalories}
        burnedCalories={burnedCalories}
        netCalories={netCalories}
        proteinTotal={proteinTotal}
        carbsTotal={carbsTotal}
        fatTotal={fatTotal}
      />

      <section className="dashboard-main-grid">
        <div className="dashboard-left-column">
          <DashboardSummarySection
            consumedCalories={consumedCalories}
            burnedCalories={burnedCalories}
            netCalories={netCalories}
          />

          <DashboardMacrosSection
            proteinTotal={proteinTotal}
            carbsTotal={carbsTotal}
            fatTotal={fatTotal}
          />

          <div className="dashboard-records-row">
            <DashboardMealsSection
              meals={dashboardMealItems}
              onDeleteMeal={handleDeleteMeal}
              onOpenMealDrawer={() => setIsMealDrawerOpen(true)}
              selectedDateKey={selectedDateKey}
            />

            <DashboardExercisesSection
              exercises={dashboardExerciseItems}
              onDeleteExercise={handleDeleteExercise}
              onOpenExerciseDrawer={() => setIsExerciseDrawerOpen(true)}
              selectedDateKey={selectedDateKey}
            />
          </div>
        </div>

        <div className="dashboard-right-column">
          <DashboardMiniCalendar
            selectedDate={selectedDate}
            consumedCalories={consumedCalories}
            burnedCalories={burnedCalories}
            onSelectDate={handleSelectDashboardDate}
          />

          <DashboardWaterTracker
            filledCupCount={filledCupCount}
            onSelectCupCount={handleSelectCupCount}
          />
        </div>
      </section>

      <DashboardBlogPreview />

      <MealEntryDrawer
        isOpen={isMealDrawerOpen}
        onClose={() => setIsMealDrawerOpen(false)}
        onSuccess={async () => {
          setIsMealDrawerOpen(false);
          await loadDashboardRecords();
        }}
      />

      <ExerciseEntryDrawer
        isOpen={isExerciseDrawerOpen}
        onClose={() => setIsExerciseDrawerOpen(false)}
        onSuccess={async () => {
          setIsExerciseDrawerOpen(false);
          await loadDashboardRecords();
        }}
      />

      <DashboardAccountModal
        isOpen={isAccountModalOpen}
        currentUser={currentUser}
        initialView={accountModalView}
        onClose={() => setIsAccountModalOpen(false)}
        onPasswordChanged={() => setIsAccountModalOpen(false)}
        onAccountDeleted={handleAccountDeleted}
      />
    </main>
  );
}

export default DashboardPage;
