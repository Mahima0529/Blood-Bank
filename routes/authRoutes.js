const express = require("express")
const { registerController } = require("../controllers/authController")

const router = express.Router()

//router
router.post ('/register' , registerController)

module.exports = router;