const userModels=require("../src/models/user.model")
        
async function registerController(req,res) {
    const {fullName,email,password}=req.body;
    const isUserAlreadyExists=await userModel.findOne({
        email
    })
    if(isUserAlreadyExists){
      return  res.status(400).json({
            message:"User aleady exits"
        })
    }
}