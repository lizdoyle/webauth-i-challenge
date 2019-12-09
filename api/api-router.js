const router = require("express").Router();

//const loginRouter = require("../login/login-router.js");
const usersRouter = require("../users/users-router.js");
//const registerRouter = require("../register/register-router.js");


//router.use("/login", loginRouter);
router.use("/users", usersRouter);
//router.use("/register", registerRouter);


router.get("/", (req, res) => {
  res.json({ api: "This is working" });
});

module.exports = router;
