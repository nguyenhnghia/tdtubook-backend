const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const notificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    detach: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
notificationSchema.plugin(paginate);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
