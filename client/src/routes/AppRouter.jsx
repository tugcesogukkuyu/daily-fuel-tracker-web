import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import AddMealPage from "../pages/addmeal/AddMealPage";
import AddExercisePage from "../pages/addexercise/AddExercisePage";
import CalendarPage from "../pages/calendar/CalendarPage";
import BlogPage from "../pages/blog/BlogPage";
import BlogDetailPage from "../pages/blog/BlogDetailPage";
import BootstrapDemoPage from "../pages/bootstrapdemo/BootstrapDemoPage";
import TailwindDemoPage from "../pages/tailwinddemo/TailwindDemoPage";



function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-meal" element={<AddMealPage />} />
        <Route path="/add-exercise" element={<AddExercisePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/bootstrap-demo" element={<BootstrapDemoPage />} />
        <Route path="/tailwind-demo" element={<TailwindDemoPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
