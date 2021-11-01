var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 20 },
  content: { type: String, required: true, maxLength: 1000 },
  timestamp: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("post", PostSchema);
