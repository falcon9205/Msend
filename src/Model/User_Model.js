import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      profilePhoto : {
        type : String,
      },
      phone:{
        type: Number,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        trim:true
      },
    },
    { timestamps: true }
  );

  export default mongoose.models.User || mongoose.model("User", UserSchema);
  