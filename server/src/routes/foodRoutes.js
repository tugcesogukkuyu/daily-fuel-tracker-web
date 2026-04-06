const express = require("express");
const {
  getFoods,
  searchFoods,
} = require("../controllers/foodController");

const router = express.Router();

/**
 * Food routes
 * Besin listeleme ve arama endpointlerini tanimlar.
 */

router.get("/", getFoods);
router.get("/search", searchFoods);

module.exports = router;
