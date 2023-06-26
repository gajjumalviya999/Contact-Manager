const express = require("express");
const router = express.Router();
const { registerUser, loginUser, currentUser } = require("./userController");
const validateToken = require("./middlewares/validateToken");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/currentUser",validateToken, currentUser);

module.exports = router;
