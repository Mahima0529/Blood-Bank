// const express = require("express");
// const authMiddleware = require("../middlewares/authMiddleware");
// const { createInventoryController, getInventoryController } = require("../controllers/inventoryController");

// const router = express.Router();


// //ADD INVENTORY||POST
// router.post('/create-inventory', authMiddleware, createInventoryController)

// //GET ALL BLOOD RECORDS
// router.get('/get-inventory', authMiddleware, getInventoryController)




// module.exports  = router;


const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
// ADD INVENTORY || POST
router.post("/create-inventory", authMiddelware, createInventoryController);

//GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddelware, getInventoryController);
//GET RECENT BLOOD RECORDS
router.get(
  "/get-recent-inventory",
  authMiddelware,
  getRecentInventoryController
);

//GET HOSPITAL BLOOD RECORDS
router.post(
  "/get-inventory-hospital",
  authMiddelware,
  getInventoryHospitalController
);

//GET DONAR RECORDS
router.get("/get-donars", authMiddelware, getDonarsController);

//GET HOSPITAL RECORDS
router.get("/get-hospitals", authMiddelware, getHospitalController);

//GET orgnaisation RECORDS
router.get("/get-organisation", authMiddelware, getOrganisationController);

//GET orgnaisation RECORDS
router.get(
  "/get-organisation-for-hospital",
  authMiddelware,
  getOrganisationForHospitalController
);

module.exports = router;