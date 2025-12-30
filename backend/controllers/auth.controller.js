const userModel=require("../src/models/user.model")
const bcryptjs=require("bcryptjs")
const jwt =require('jsonwebtoken')

        
async function registerUser(req,res) {
    const {fullName,email,password}=req.body;
    const isUserAlreadyExists=await userModel.findOne({
        email
    })
    if(isUserAlreadyExists){
      return  res.status(400).json({
            message:"User aleady exists"
        })
    }
    const hashedPassword=await bcryptjs.hash(password,10);
    
    const user=await userModel.create({
        fullName,
        email,
        password:hashedPassword
    })


const token=jwt.sign({
    id:user._id,
   
}, "59d1a2b949932bfb65cc8166cda4125a7739f5db")
res.cookie("token",token)

res.status(201).json({
    message:"User registeres successfully",
    user:{
        _id:user._id,
        email:user.email,
        fullName:user.fullName
    }
})

}


async function loginUser(req,res) {
    
}

module.exports={
registerUser,
loginUser,
}
