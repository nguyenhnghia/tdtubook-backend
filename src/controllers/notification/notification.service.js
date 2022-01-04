const Notification = require("../../models/Notification");
const ApiError = require("../../utils/ApiError");
const pick = require("../../utils/pick");

const populateOptions = [
  {
    path: "department",
    select: "name avatar",
  },
];

const getNotificationById = async (notificationId) => {
  const notification = await Notification.findById(notificationId).populate(populateOptions);
  if (!notification) throw new ApiError(400, "Notification not found");
  return notification;
};

const queryNotifications = async (query, options) => {
  const paginateOptions = options;
  paginateOptions.populate = populateOptions;
  paginateOptions.sort = "-createdAt";

  const notifications = await Notification.paginate(query, paginateOptions);
  return notifications;
};

const createNotification = async (createBody, user) => {
  const newNotification = new Notification({
    ...createBody,
    department: user._id,
  });
  await newNotification.save();

  // Modify notification before returning
  const retNotification = newNotification.toObject();
  retNotification.department = pick(user.toObject(), ["name", "avatar"]);

  return retNotification;
};

const updateNotification = async (notificationId, updateBody) => {
  const notification = await Notification.findByIdAndUpdate(notificationId, updateBody, {
    new: true,
  }).populate(populateOptions);
  return notification;
};

const deleteNotification = async (notificationId) => {
  await Notification.findByIdAndRemove(notificationId);
  return null;
};

module.exports = {
  getNotificationById,
  queryNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
};
