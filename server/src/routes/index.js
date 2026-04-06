const express = require("express");
const healthRouter = require("./healthRoutes");
const mealRouter = require("./mealRoutes");
const databaseRouter = require("./databaseRoutes");
const userRouter = require("./userRoutes");
const authRouter = require("./authRoutes");
const exerciseRouter = require("./exerciseRoutes");
const waterRouter = require("./waterRoutes");
const foodRoutes = require("./foodRoutes");




const router = express.Router();

/*
  API route groups
  Uygulamanin ana endpoint gruplarini bir araya toplar.
*/
router.use("/health", healthRouter);
router.use("/meals", mealRouter);
router.use("/database", databaseRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/exercises", exerciseRouter);
router.use("/water", waterRouter);
router.use("/foods", foodRoutes);






module.exports = router;
