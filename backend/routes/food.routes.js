const express=require("express")

const router=express.Router()
const authMiddleware=require('../middlerware/auth.middleware')
const foodControllers=require('../controllers/food.controller')


//Post /api/food. this could be protected

router.post('/',authMiddleware.authFoodPartnerMiddleware,foodControllers.createFood)


module.exports=router

