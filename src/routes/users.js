const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUser,
  loginUser,
} = require("../controllers/userController");

/* GET users listing. */
router.get("/get", getUser);
/* Register user */
router.post("/register", registerUser);
/* Login user */
router.post("/login", loginUser);

module.exports = router;
