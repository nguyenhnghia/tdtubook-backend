const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const likeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
likeSchema.plugin(paginate);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
