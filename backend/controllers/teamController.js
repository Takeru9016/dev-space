const { Team, Event, User, HttpError, asyncErrorHandler } = require("../models/Model")
const mongoose = require('mongoose')


const addTeam = asyncErrorHandler(async (req, res, next) => {
    const { description, leaderMongoId, members, eventId } = req.body;

    const teamLeader = await User.findOne({
        _id: leaderMongoId
    })
    if (!teamLeader) {
        throw new HttpError("leader mongo id not found", 404)
    }
    const newTeam = new Team({
        description,
        leaderId: leaderMongoId,
        members,
        leaderName: teamLeader.name,
        eventId
    })
    const event = await Event.findOne({
        _id: eventId
    })
    if (!event) {
        throw new HttpError("event id not found", 404)
    }

    const team = await Team.findOne({
        leaderId: leaderMongoId,
        eventId: eventId
    })
    if (team) {
        throw new HttpError("team leader already has team for event", 409)
    }

    event.teamIDs.push(newTeam._id)

    const session = await mongoose.startSession();
    session.startTransaction();


    const teamResult = await newTeam.save({ session });
    const eventResult = await event.save({ session });

    // if (!teamResult || !eventResult) {
    //     throw new HttpError("something went wrong in creating team", 500)
    // }

    session.commitTransaction()
        .then(() => {
            res.status(201).json(
                { message: "Team successfully created" }
            );
        })
        .catch((error) => {
            throw new HttpError("Creating team failed", 500)
        })
        .finally(() => {
            session.endSession();
        });
})


const getTeamsByEventId = asyncErrorHandler(async (req, res, next) => {
    const { eventId } = req.body;

    let event = await Event.find({
        _id: eventId
    })
    if (!event) {
        throw new HttpError("event id not found", 404)
    }
    let arrOfTeams = event[0].teamIDs;
    let result = [];

    for (let i = 0; i < arrOfTeams.length; i++) {
        const element = arrOfTeams[i];
        const team = await Team.findOne({
            _id: element
        })
        //dont push null elements causes error on backend - Denzil
        if (team) result.push(team)

    }
    res.json({ result: result });
})

const getTeamsByTeamLeaderId = asyncErrorHandler(async (req, res, next) => {
    const { leaderId } = req.body;

    const result = await Team.find({
        leaderId: leaderId
    })

    res.json({ result: result });
})

exports.addTeam = addTeam
exports.getTeamsByEventId = getTeamsByEventId
exports.getTeamsByTeamLeaderId = getTeamsByTeamLeaderId
