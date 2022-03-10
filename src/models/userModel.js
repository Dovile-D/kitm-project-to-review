const mongoose = require("mongoose");
// user has a name, email and password
// we can add more later
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please write name"],
    },
    email: {
      type: String,
      required: [true, "Please add email"],
    },
    password: {
      type: String,
      required: [true, "Please write password"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
