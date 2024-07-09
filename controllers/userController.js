const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");

//@desc Register new user
//@route POST /api/users/register
//@access public
//! Register - ########################################
const registerController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // const userAvaliable = await User.findOne({email});
  const userAvaliable = await User.findOne({ email });
  console.log("user is alreade exist = ", userAvaliable);
  if (userAvaliable) {
    res.status(400);
    throw new Error("User is already registered!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.json({
    message: "New user is created!",
    newUser,
  });
});

//@desc Log in with user
//@route POST /api/users/login
// @acesss public
//! LOGIN - ########################################
const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
// console.log('user oncesi');
  const user = await User.findOne({ email });
// console.log('usersonrasi');
console.log(user);
// console.log(await bcrypt.compare(password, user.password)); 


  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
        {
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
    )
    res.status(200).json({accessToken:token,username:user.username})
  } else {
    res.status(401);
    throw new Error("Email or password is invalid!");
  }

});


//@desc Check the current user is loginned
//@route GET /api/users/current
//@access private
//! CURRENT - ########################################
const currentController = asyncHandler(async (req, res) => {
  res.json({acessToken:req.req_access_token,user:req.req_user});
});

module.exports = {
  registerController,
  loginController,
  currentController,
};
