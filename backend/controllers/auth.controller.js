const userModel = require("../src/models/user.model")
const foodPartnerModel = require("../src/models/foodpartner.model")
const bcryptjs = require("bcryptjs");
const { json } = require("express");
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;
  const isUserAlreadyExists = await userModel.findOne({
    email
  })
  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User aleady exists"
    })
  }
  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword
  })


  const token = jwt.sign({
    id: user._id,

  }, process.env.JWT_SECRET)
  res.cookie("token", token)

  res.status(201).json({
    message: "User registeres successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName
    }
  })

}


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


async function logoutUser(req, res) {
  res.clearCookie("token");

  res.status(200).json({
    message: "User logged out successfully"
  })

}

async function registerFoodPartner(req, res) {
  try {
    const { name, email, password } = req.body;


    const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });

    if (isAccountAlreadyExists) {
      return res.status(400).json({
        message: "Food partner already exists",
      });
    }

    
    const hashedPassword = await bcryptjs.hash(password, 10);

   
    const foodpartner = await foodPartnerModel.create({
      name,
      email,
      password: hashedPassword,
    });

  
    const token = jwt.sign(
      { id: foodpartner._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } 
    );

   
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    return res.status(201).json({
      message: "Food partner registered successfully",
      foodpartner: {
        _id: foodpartner._id,// ye id mongoose bnata hai 
        name: foodpartner.name,
        email: foodpartner.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}





async function loginFoodPartner(req,res) {
  const {email,password,}=req.body;
  const foodpartner=await foodPartnerModel.findOne({
    email
  })

  if(!foodpartner){
    return res.status(400).json({
      message:"Invalid email or password"
    })
  }
  const isPasswordValid=await bcryptjs.compare(password,foodpartner.password)
  if(!isPasswordValid){
    return re.status(400).json({
      message:"Invalid emial or password"
    })
  }
  const token =jwt.sign({
    id:foodpartner._id,

  },process.env.JWT_SECRET)
  res.status(200).json({
    message:"Food partner logged in successfully",
  foodpartner:{
    _id:foodpartner._id,
    email:foodpartner.email,
    name:foodpartner.name,


  }
  })
}

function logoutFoodPartner(req,res){
  res.clearCookie("token")
  res.status(200).json({
    message:"Food partner logged out successfully"
  })
  

}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  loginFoodPartner,
  registerFoodPartner,
  logoutFoodPartner,
}
