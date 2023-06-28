const { Participant, User, Team, Event, asyncErrorHandler, HttpError } = require("../models/Model")


const addParticipantAndTeam = asyncErrorHandler(async (req, res, next) => {
    const { eventId, description, userId, type, members } = req.body;

    let result;
    let message;
    const user = await User.findOne({
        _id: userId
    })
    if (!user) {
        throw new HttpError("Invalid userId", 404)
    }
    const event = await Event.findOne({
        _id: eventId
    })
    if (!event) {
        throw new HttpError("Invalid eventId", 404)
    }
    const participant = await Participant.findOne({
        eventId,
        participantId: userId
    })
    if (participant) {
        participant.description = description
        const result = await participant.save();
        if (result) {
            throw new HttpError("description updated", 200)
        }
        throw new HttpError("Already a participant for event", 409)
    }


    const team = await Team.findOne({
        eventId,
        leaderId: userId
    })
    if (team) {
        throw new HttpError("Already a team leader for event", 409)
    }

    if (type == "finding") {
        const newParticipant = new Participant({
            eventId,
            description,
            participantId: userId
        });
        result = await newParticipant.save();
        if (!result) {
            throw new HttpError("Something went wrong while adding participant", 500)
        }
        message = "Participant successfully added";
    }
    else {

        const newTeam = new Team({
            leaderId: user._id,
            description,
            members,
            leaderName: user.name,
            eventId
        })
        event.teamIDs.push(newTeam._id)
        const teamResult = await newTeam.save();
        const eventResult = await event.save();
        if (!teamResult || !eventResult) {
            throw new HttpError("Something went wrong while adding team", 500)
        }
        message = "team successfully added";
    }
    res.status(201).json({ message });
})



const getParticipantsByEventId = asyncErrorHandler(async (req, res, next) => {
    const { eventId } = req.body;
    let result = await Participant.find({
        eventId: eventId
    })
    res.json({ result: result })
})

exports.addParticipantAndTeam = addParticipantAndTeam
exports.getParticipantsByEventId = getParticipantsByEventId