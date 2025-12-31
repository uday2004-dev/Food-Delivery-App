    const mongoose =require("mongoose")
    const foodPartnerSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true,

        },
        emails:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            requires:true,
            
        }
    })