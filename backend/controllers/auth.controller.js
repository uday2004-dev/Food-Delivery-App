const userModel=require("../src/models/user.model")
const bcryptjs=require("bcryptjs");
const { json } = require("express");
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
   
},process.env.JWT_SECRET )
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


// async function loginUser(req,res) {
//     const {email,password}=req.body;
//     const user=await userModel.findOne({
//         email
//     })
//     if(!user){
//        return res.status(400).json({
//   message: "Invalid email or password",
// });

//     }
//     const isPasswordValid=await bcryptjs.compare(password, user.password)

// ;
// if(!isPasswordValid){
//  return res.status(400).json({
//     message:"Invalid email or password"
//  },process.env.JWT_SECRET )
 
// }
// const token=jwt.sign({
//     id:user._id,

// },)
// res.cookie("token",token)
// res.status(200).json({
//     message:"user logged in succesfully",
//     user:{
//         _id:user._id,
//         email:user.email,
//         fullName:user.fullName
//     }
// })
// }
async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}


async function logoutUser(req,res) {
    res.clearCookie("token");

    res.status(200).json({
        message:"User logged out successfully"
    })
    
}

module.exports={
registerUser,
loginUser,
logoutUser,
}
