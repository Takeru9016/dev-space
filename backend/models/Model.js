const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const Schema = mongoose.Schema

const userSchema = new Schema({
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    mailId: { type: String, required: true },
    invites: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Invites' }],
    requests: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Requests' }]

    //lastName: { type: String, required: true },
    //revenue: { type: Number, required: true },
    //email: { type: String, required: true, unique: true },
    //password: { type: String, required: true, minlength: 6 },
    //image: { type: String, required: true },
    //places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]

})
const User = mongoose.model('User', userSchema)

const eventSchema = new Schema({
    eventName: { type: String, required: true },
    organizer: { type: String, required: true },
    description: { type: String, required: true },
    minTeamSize: { type: Number, required: true },
    timeStamp: { type: Date, required: true },
    maxTeamSize: { type: Number, required: true },
    teamIDs: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Team' }]

})
const Event = mongoose.model('Events', eventSchema);

const teamsSchema = new Schema({
    leaderId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    leaderName: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: String, required: true }],
    eventId: { type: mongoose.Types.ObjectId, ref: 'Event' }

})
const Team = mongoose.model('Team', teamsSchema);


const inviteSchema = new Schema({
    sendingTeamId: { type: mongoose.Types.ObjectId, required: true },
    description: { type: String, required: true },
    eventId: { type: mongoose.Types.ObjectId, required: true },
})
const Invite = mongoose.model('Invite', inviteSchema);



const participantSchema = new Schema({
    eventId: { type: mongoose.Types.ObjectId, required: true },
    participantId: { type: mongoose.Types.ObjectId, required: true },
    description: { type: String, required: true }
})
const Participant = mongoose.model('Participant', participantSchema);


const requestSchema = new Schema({
    sendingParticipantId: { type: mongoose.Types.ObjectId, required: true },
    eventId: { type: mongoose.Types.ObjectId, required: true },
    teamId: { type: mongoose.Types.ObjectId, required: true },
    description: { type: String, required: true }
})
const Request = mongoose.model('Request', requestSchema)

class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.code = errorCode;
    }
}

const asyncErrorHandler = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(err => next(err));
    }
}

const sendMail = async (userMail, subject, content) => {
    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"TeamIGO-no-reply" <teamigo.no.reply@outlook.com>', // sender address
        to: userMail, // list of receivers
        subject: subject, // Subject line
        text: content, // plain text body
        //html: "<b>Hello world? this froom express dude nust env</b>", // html body
    });
    return info
}

exports.User = User
exports.Event = Event
exports.Team = Team
exports.Invite = Invite
exports.Participant = Participant
exports.Request = Request
exports.HttpError = HttpError
exports.asyncErrorHandler = asyncErrorHandler
exports.sendMail = sendMail