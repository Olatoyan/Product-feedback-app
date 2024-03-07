const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 20,
    trim: true,
    required: [true, "Name is required"],
  },
  username: {
    type: String,
    minLength: 3,
    maxLength: 20,
    trim: true,
    required: [true, "Username is required"],
    unique: true,
    lowercase: true,
  },
  image: String,
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: 6,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match",
    },
  },
  upvotedFeedbacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

userSchema.methods.matchPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
