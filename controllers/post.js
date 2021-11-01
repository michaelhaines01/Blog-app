const Posts = require("../models/posts");
const Comments = require("../models/comments");
const { body, validationResult } = require("express-validator");

exports.getPosts = (req, res, next) => {
  Posts.find({ published: true }).exec((err, posts) => {
    if (err) {
      return next(err);
    }
    return res.json(posts);
  });
};
exports.getComments = (req, res, next) => {
  Comments.find({ post: req.params.id }).exec((err, comments) => {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
};

exports.createComments = [
  body("username").trim().isLength({ max: 25 }).escape(),
  body("content").trim().isLength({ max: 150 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
    }
    let comment = new Comments({
      post: req.params.id,
      content: req.body.content,
      timestamp: new Date(),
      username: req.body.username,
    });
    comment.save((err) => {
      if (err) {
        return next(err);
      } else {
        return res.json(comment);
      }
    });
  },
];
