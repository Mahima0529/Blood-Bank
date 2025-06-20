const express = require("express")
const { registerController ,loginController, currentUserController } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router()

//router
//register ||post
router.post ('/register' , registerController)

//login ||post
router.post("/login" , loginController);

//Get Curent User ||GEt
router.get('/currentuser' ,authMiddleware, currentUserController);

module.exports = router;