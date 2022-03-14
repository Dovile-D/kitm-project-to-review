const express = require("express");
const router = express.Router();
const {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

/* GET events listing. */
router.get("/events/:id", getEvent);
/* Create event */
router.post("/events", createEvent);
/* Update event */
router.patch("/events/:id", updateEvent);
/* Delete event*/
router.delete("/events/:id", deleteEvent);

module.exports = router;
