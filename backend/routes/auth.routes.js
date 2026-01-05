// const express = require("express");
// const router = express.Router();

// const {
//   registerUser,
//   loginUser,
// } = require("../controllers/auth.controller");

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// module.exports = router;

const express=require("express")

const authController=require("../controllers/auth.controller")

const router=express.Router()



router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)



router.post(
  "/food-partner/register",
  (req, res, next) => {
    console.log("✅ REGISTER ROUTE HIT");
    next();
  },
  authController.registerFoodPartner
);
// router.post("/food-partner/register",authController.registerFoodPartner)
router.post("/food-partner/login",authController.loginFoodPartner)
router.get("/food-partner/logoutpartner",authController.logoutFoodPartner)

module.exports=router;
