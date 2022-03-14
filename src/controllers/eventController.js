// const jwt = require("jsonwebtoken");
// const { randomBytes, scryptSync, timingSafeEqual } = require("crypto");
const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");
const mongoose = require("mongoose");
const e = require("express");

// read event function made from example of user function
const getEvent = asyncHandler(async (req, res) => {
  // did this because mongoose expects an object
  // and this lets us to see more possible errors like invalid id lenghts
  const eventId = mongoose.Types.ObjectId(req.body.id);
  // finds event by id
  const event = await Event.findById(eventId);

  if (event) {
    res.status(200).json({
      eventId: event._id,
      eventName: event.eventName,
      dateTime: event.dateTime,
      eventDescription: event.eventDescription,
      eventPhoto: event.eventPhoto,
    });
  } else {
    throw throwCustomError("Event not found", 400);
  }
});



//***** functions below need to be reviewed because they were made from scratch ******
// read function 
exports.getEvent = async (req, res) => {
    const eventId = mongoose.Types.ObjectId(req.body.id);
    // finds event by id
    // checking if id is valid
    try {
        const event = await Event.findById(eventId);
        res.send({data: event});
    } catch {
        res.status(404).send({ error: "Event is not found"});
    }
    
};

// create event function
exports.createEvent = async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.send({data: event});
}

// update event function
exports.updateEvent = async (req, res) => {
    // checking if id is valid
    try {
        const event = await Event.findById(req.body.id);
        Object.assign(event, req.body);
        // updating database
        event.save();
        res.send({data: event});
    } catch {
        res.status(404).send({ error: "Event is not found"});
    }
}

// delete event function
exports.deleteEvent = async (req, res) => {
     // checking if id is valid
     try {
        const event = await Event.findById(req.body.id);
        await event.remove();
        res.send({data: true});
    } catch {
        res.status(404).send({ error: "Event is not found"});
    }
}

