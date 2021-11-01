var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "Posts" },
  content: { type: String, required: true, maxLength: 250 },
  timestamp: { type: Date, default: Date.now },
  username: { type: String, required: true, maxLength: 100 },
});

module.exports = mongoose.model("comment", CommentsSchema);
