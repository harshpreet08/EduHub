const express = require("express");
const { createUser, login, logout } = require("../controller/user");
const { validateCreateUserRequest } = require("../middlewares/user-middleware");
const router = express.Router();

router.post("/signup", validateCreateUserRequest, createUser);
router.post("/login",login);
router.get("/logout",logout);

module.exports = router;
