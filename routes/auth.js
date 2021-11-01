const express = require("express");

const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

router.post("/login", function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info.message,
        user: user,
        auth: false,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      jwt.sign({ user }, "secretkey", { expiresIn: 3600 }, (err, token) => {
        return res.json({
          user,
          auth: true,
          message: "Success",
          token: "Bearer " + token,
        });
      });
    });
  })(req, res, next);
});

module.exports = router;
