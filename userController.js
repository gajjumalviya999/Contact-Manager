const asynHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Users = require("./models/userModels");
const jwt = require("jsonwebtoken");
const userModels = require("./models/userModels");
const registerUser = asynHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Details missing");
  }
  //check available users
  const availableUser = await Users.findOne({ email });
  if (availableUser) {
    throw new Error("User already exists with given email");
  }
  const hasedPassword = await bcrypt.hash(password, 10);
  const newUser = await Users.create({
    username,
    email,
    password: hasedPassword,
  });
  if (newUser) {
    console.log(newUser);
    res.status(201).send({ id: newUser.id, email: newUser.email });
  } else {
    throw new Error("Validation Failed");
  }
});

const loginUser = asynHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  const user = await Users.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const auth_token = await jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "10m",
      }
    );
    res.status(200).json({username: user.username, auth_token: auth_token, email: user.email, id: user.id});
  } else {
    throw new Error("wrong email or Password");
  }
});

const currentUser = asynHandler(async (req, res) => {
  res.status(200).json(req.user||{});
});

module.exports = { registerUser, currentUser, loginUser };
