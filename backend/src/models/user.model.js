const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,

    }, email: {
        type: String,
        unique: true,
    }
    , password: {
        type: String,
    },

},
    {
        typestamps: true
    }


)

 const userModel= mongoose.model("user",userSchema)
 module.exports=userModel;