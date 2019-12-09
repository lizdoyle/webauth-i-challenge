const router = require("express").Router();
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  Users.find()
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/register", (req, res, next) => {
  let user = req.body;

  if (!user.username || !user.password) {
    res
      .status(404)
      .json({ message: "Please enter username and password" });
  }

  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  let { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({ message: "Invalid username or password" });
  }

  Users.findBy({ username })
    .first()
    .then(user => {
      if (username && bcrypt.compareSync(password, user.password)) {
        req.session.username = username;
        res.status(201).json({ message: "Logged in", token: user.id });
      } else {
        res.status(404).json({ message: "Cannot find username or password!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

function authorize(req, res, next) {
  const username = req.body["username"];
  const password = req.body["password"];

  if (!username || !password) {
    res.status(401).json({ message: "Invalid username or password" });
  }

  Users.findBy({ username })
    .first()
    .then(user => {
      if (username && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(404).json({ message: "Invalid info!" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = router;
