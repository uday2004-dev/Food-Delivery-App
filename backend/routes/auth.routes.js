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

module.exports=router;
