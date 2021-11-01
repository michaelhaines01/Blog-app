var express = require("express");
var router = express.Router();

const postController = require("../controllers/post");

/* GET home page. */
router.get("/posts", postController.getPosts);
router.get("/posts/:id/comments", postController.getComments);
router.post("/posts/:id/comments", postController.createComments);

router.get("login");

router.get("admin/posts");

module.exports = router;
