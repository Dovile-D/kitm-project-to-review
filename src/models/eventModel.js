const mongoose = require("mongoose");
// event has a name, date/time, description and photo
// we can add more later
const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, "Please write event name"],
    },
    dateTime: {
      type: String,
      default: DateTime,
      required: [true, "Please add event date and time"],
    },
    eventDescription: {
      type: String,
      required: [true, "Please write event description"],
    },
    eventPhoto: {
        data: Buffer,
        contentType: String,
        required: [true, "Please upload event photo"],
      },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
