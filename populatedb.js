#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
  if (!userArgs[0].startsWith('mongodb')) {
      console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
      return
  }
  */
const async = require("async");
const User = require("./models/user");
const Post = require("./models/posts");
const Comment = require("./models/comments");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let users = [];
let posts = [];
let comments = [];

function createuser(user, password, cb) {
  let newuser = {
    username: user,
    password: password,
  };

  let userschema = new User(newuser);

  userschema.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    users.push(userschema);
    cb(null, user);
  });
}

function createpost(title, content, timestamp, published, id, cb) {
  let postdetail = {
    title: title,
    content: content,
    timestamp: timestamp,
    published: published,
    user: id,
  };

  let post = new Post(postdetail);

  post.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    posts.push(post);
    cb(null, posts);
  });
}

function createcomment(username, content, timestamp, post, cb) {
  let commentdetail = {
    post: post,
    content: content,
    timestamp: timestamp,
    username: username,
  };

  let comment = new Comment(commentdetail);

  comment.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    comments.push(comment);
    cb(null, posts);
  });
}

function makeuser(cb) {
  async.parallel(
    [
      function (callback) {
        createuser("michael", "1234", callback);
      },
    ],
    cb // optional callback
  );
}

function makeposts(cb) {
  async.parallel(
    [
      function (cb) {
        createpost(
          "First Blog",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          Date.now(),
          false,
          users[0].id,
          cb
        );
      },
      function (cb) {
        createpost(
          "Second Blog",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          Date.now(),
          true,
          users[0].id,
          cb
        );
      },
    ],
    // optional callback
    cb
  );
}

function makecomment(cb) {
  async.parallel(
    [
      function (cb) {
        createcomment(
          "Bill",
          "Great Post totaly agree",
          Date.now(),
          posts[0].id,
          cb
        );
      },
      function (cb) {
        createcomment(
          "Bob",
          "Yeah this is great!",
          Date.now(),
          posts[0].id,
          cb
        );
      },
      function (cb) {
        createcomment(
          "Barbra",
          "Wow great points",
          Date.now(),
          posts[1].id,
          cb
        );
      },
      function (cb) {
        createcomment(
          "Sally",
          "I love your point of view!",
          Date.now(),
          posts[1].id,
          cb
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [makeuser, makeposts, makecomment],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("here");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
