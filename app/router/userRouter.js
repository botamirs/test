const { Router } = require("express");
const router = new Router();

const user = require("@ctrl/user");

//? route ->  /user/....
router.get("/register", user.register);
router.post("/register", user.handleRegister);

router.get("/login", user.login);
router.post("/login", user.handleLogin);

module.exports = router;