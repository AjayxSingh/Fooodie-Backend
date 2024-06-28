import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    auth0Id:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,
    },
    adressLine1:{
        type:String,
    },
    city:{
        type:String,
    },
    country:{
        type:String,
    }
})

const User  = mongoose.model("USer" , userSchema);
export default User;