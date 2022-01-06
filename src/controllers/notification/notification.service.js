const Notification = require("../../models/Notification");
const ApiError = require("../../utils/ApiError");

const populateOptions = [
  {
    path: "department",
    select: "name avatar",
  },
  {
    path: "category",
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

const checkCategoryPermission = (notiCategory, userCategories) => {
  const isAllowed = userCategories.some((category) => category.toString() === notiCategory);
  return isAllowed;
};

const createNotification = async (createBody, user) => {
  if (!checkCategoryPermission(createBody.category, user.categories)) {
    throw new ApiError(400, "Department is not responsible in this category");
  }

  const notification = new Notification({
    ...createBody,
    department: user._id,
  });
  const newNotification = await notification.save().then((doc) => doc.populate(populateOptions));

  return newNotification;
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
