import { Schema, model, models } from "mongoose"
import crypto from "crypto";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
  },
  profileImagePath: {
    type: String,
    required: [true, "Profile image is required"],
  },
  wishlist: {
    type: Array,
    default: [],
  },
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  works: {
    type: Array,
    default: [],
  },
  password_reset_token:{type:String},
password_reset_token_expires:{type:String },
})

UserSchema.methods.create_reset_password_token= function(){
  const reset_token= crypto.randomBytes(32).toString("hex");
  this.password_reset_token= crypto.createHash('sha256').update(reset_token).digest("hex");
  this.password_reset_token_expires= Date.now()+10*60*1000 ;
  console.log(reset_token,this.password_reset_token);
  return reset_token;
  }

const User = models.User || model("User", UserSchema)

export default User