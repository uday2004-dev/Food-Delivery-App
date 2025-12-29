const express=require("require")
// const registerController=require("registerContoller")
const authController=require("../controllers/auth.controller")

const router=express.Router()



router.post('/user/register',authController.registerController)
router.post('/user/register',authController.loginUser)

module.exports=router;