const Posts = require("../models/posts");
const { body, validationResult } = require("express-validator");

exports.GetPosts = (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return next(err);
    }
    return res.json(posts);
  });
};

exports.EditPost = [
  body("title").trim().isLength({ max: 20 }).escape(),
  body("content").trim().isLength({ max: 1000 }).escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        message: errors.array(),
      });
    } else {
      try {
        await Posts.findByIdAndUpdate(req.params.id, {
          title: req.body.title,
          content: req.body.content,
        });
        res.json({ message: "success" });
      } catch (err) {
        return next(err);
      }
    }
  },
];

exports.CreatePost = [
  body("title").trim().isLength({ max: 20 }).escape(),
  body("content").trim().isLength({ max: 1000 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        message: errors.array(),
      });
    } else {
      let post = new Posts({
        user: req.body.user,
        content: req.body.content,
        title: req.body.title,
        timestamp: new Date(),
      });
      post.save((err) => {
        if (err) {
          return next(err);
        } else {
          return res.json(post);
        }
      });
    }
  },
];

exports.DeletePost = (req, res, next) => {
  Posts.findByIdAndDelete(req.params.id).exec(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: "Success" });
  });
};

exports.PublishPost = async (req, res, next) => {
  try {
    await Posts.findByIdAndUpdate(req.params.id, {
      published: req.body.publish,
    });
    res.json({ message: "Success" });
  } catch (err) {
    return next(err);
  }
};
