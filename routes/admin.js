var express = require("express");
var router = express.Router();
const passport = require("passport");
const adminController = require("../controllers/admin");

/* GET users listing. */

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminController.GetPosts
);

router.get(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  adminController.DeletePost
);

router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  adminController.EditPost
);

router.post(
  "/publish/:id",
  passport.authenticate("jwt", { session: false }),
  adminController.PublishPost
);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  adminController.CreatePost
);

module.exports = router;
