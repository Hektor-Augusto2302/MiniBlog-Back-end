const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/UserControllers");

const { userCreateValidation } = require("../middlewares/userValidation");
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");

router.post("/register/user", userCreateValidation(), validate, registerUser);

module.exports = router;