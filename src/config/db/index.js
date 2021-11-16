const mongoose = require("mongoose");

async function connect(url) {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
}

mongoose.connection.on("error", console.error.bind(console, "database connected error:"));

mongoose.connection.once("open", () => {
  console.log("database connected");
});

module.exports = { connect };
