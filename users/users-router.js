const router = require("express").Router();
const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


// router.post("/register", (req, res, next) => {
//   let user = req.body;

//   if (!user.username || !user.password) {
//     res
//       .status(404)
//       .json({ message: "Please enter your username and password" });
//   }

//   const hash = bcrypt.hashSync(user.password, 12);
//   user.password = hash;
//   Users.add(user)
//     .then(saved => {
//       res.status(201).json(saved);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

// router.post("/login", (req, res) => {
//   let { username, password } = req.body;

//   if (!username || !password) {
//     res.status(401).json({ message: "Invalid username or password" });
//   }

//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (username && bcrypt.compareSync(password, user.password)) {
//         res.status(201).json({ message: "Logged in", token: user.id });
//       } else {
//         res.status(404).json({ message: "Invalid Password Entered!" });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// function authorize(req, res, next) {
//   const username = req.body["username"];
//   const password = req.body["password"];

//   if (!username || !password) {
//     res.status(401).json({ message: "Invalid username or password" });
//   }

//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (username && bcrypt.compareSync(password, user.password)) {
//         next();
//       } else {
//         res.status(404).json({ message: "No user located!" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// }

module.exports = router;
