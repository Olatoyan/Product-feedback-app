const { promisify } = require("util");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

function createSendToken(user, statusCode, res) {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    image: req.body.image,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  await newUser.save();
  req.user = newUser;

  console.log(req.user);
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Please provide username and password.", 400));
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.matchPassword(password, user.password))) {
    return next(new AppError("Invalid username or password.", 401));
  }

  req.user = user;

  createSendToken(user, 200, res);
});



exports.logout = catchAsync(async (req, res, next) => {
  req.user = null;
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
    message: "Successfully logged out.",
  });
});
