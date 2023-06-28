const { Event, asyncErrorHandler, HttpError } = require("../models/Model")

const addEvent = asyncErrorHandler(async (req, res, next) => {
    const { eventName, organizer, description, minTeamSize, maxTeamSize, timeStamp } = req.body;

    const newEvent = new Event({
        eventName,
        organizer,
        description,
        minTeamSize,
        maxTeamSize,
        timeStamp: timeStamp
    })
    const result = await newEvent.save();
    if (!result) {
        throw new HttpError("Something went wrong while adding event", 500)
    }

    res.status(201).json({ message: "Event added successfully" });
})

const getEvents = asyncErrorHandler(async (req, res, next) => {
    const result = await Event.find();
    let arr = [];
    result.forEach(element => {
        const { _id, eventName, organizer, description, minTeamSize, maxTeamSize, timeStamp } = element;
        arr.push(
            {
                _id, eventName, organizer, description, minTeamSize, maxTeamSize, timeStamp
            }
        )
    });
    res.json({ result: arr })
})
exports.addEvent = addEvent
exports.getEvents = getEvents
