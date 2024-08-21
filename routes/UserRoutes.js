const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/UserControllers");

router.post("/register/user", registerUser);

module.exports = router;