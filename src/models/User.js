import mongoose from "mongoose";
import bcript from "bcrypt";

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String },
  socialOnly: { type: Boolean, default: false },
  avatarUrl: { type: String },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  this.password = await bcript.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
