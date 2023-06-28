const { Invite, User, Team, asyncErrorHandler, HttpError, Participant, sendMail, Event } = require("../models/Model")

const sendInvite = asyncErrorHandler(async (req, res, next) => {
    const { sendingTeamId, description, eventId, recipientId } = req.body;

    const team = await Team.findOne({
        _id: sendingTeamId
    })
    if (!team) {
        throw new HttpError("sending team not found", 404)
    }

    const event = await Event.findOne({
        _id: eventId
    })
    if (!event) {
        throw new HttpError("event not found", 404)
    }

    const user = await User.findOne({
        _id: recipientId
    })
    if (!user) {
        throw new HttpError("user not found", 404)
    }



    const newInvite = new Invite({
        sendingTeamId,
        description,
        eventId
    })
    user.invites.push(newInvite._id);
    const inviteResult = await newInvite.save();
    const userResult = await user.save();
    if (!inviteResult || !userResult) {
        throw new HttpError("Something went wrong while sending invite", 500)
    }
    res.status(201).json({ message: "invite sent successfully " });
})

const getInvites = asyncErrorHandler(async (req, res, next) => {
    const { userId } = req.body;
    const user = await User.findOne({
        _id: userId
    })
    if (!user) {
        throw new HttpError("user not found", 404)
    }

    const arrOfInviteId = user.invites;

    let arr = [];
    for (let i = 0; i < arrOfInviteId.length; i++) {
        const element = arrOfInviteId[i];
        let invite = await Invite.findOne(element)
        arr.push(invite)
    }
    res.json({ result: arr })
})

const rejectInvite = asyncErrorHandler(async (req, res, next) => {
    const { userId, inviteId } = req.body;

    const user = await User.findOne({
        _id: userId
    })
    if (!user) {
        throw new HttpError("user not found", 404)
    }

    let arrOfInvites = user.invites;

    let index = arrOfInvites.indexOf(inviteId);

    if (index !== -1) {
        arrOfInvites.splice(index, 1);
    }

    const userResult = await user.save();
    const inviteResult = await Invite.deleteOne({
        _id: inviteId
    })
    if (!userResult || !inviteResult) {
        throw new HttpError("something went wrong while rejecting invite", 500)
    }
    res.json({ message: "Invite successfully rejected" });
})

//may use transactions here as there are four CRUD operations 
const acceptInvite = asyncErrorHandler(async (req, res, next) => {
    const { userId, inviteId } = req.body;

    const user = await User.findOne({
        _id: userId
    })
    if (!user) {
        throw new HttpError("user not found", 404)
    }

    let arrOfInvites = user.invites;

    let index = arrOfInvites.indexOf(inviteId);

    if (index !== -1) {
        arrOfInvites.splice(index, 1);
    }
    const invite = await Invite.findOne({
        _id: inviteId
    })
    if (!invite) {
        throw new HttpError("invite not found", 404)
    }
    const event = await Event.findOne({
        _id: invite.eventId
    })
    const eventId = invite.eventId
    const team = await Team.findOne({
        _id: invite.sendingTeamId
    })
    if (!team) {
        throw new HttpError("team not found", 404)
    }
    team.members.push(user.name);

    const teamResult = await team.save();
    const userResult = await user.save();
    const inviteResult = await Invite.deleteOne({
        _id: inviteId
    })
    const participantResult = await Participant.deleteOne({
        participantId: userId,
        eventId: eventId
    })

    //code for sending mail
    const leader = await User.findOne({
        _id: team.leaderId
    })
    const mailSubject = "Invitation Accepted"
    const mailContent = user.name
        + " accepted your invitation for joining your team for the event "
        + event.eventName
    const mailResult = sendMail(leader.mailId, mailSubject, mailContent)




    if (!teamResult || !userResult || !inviteResult || !participantResult) {
        throw new HttpError("Something went wrong while accepting request", 500)
    }
    res.json({ message: "Invite successfully accepted" });
})


const sendMaile = async (req, res, next) => {

    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     service: "hotmail",
    //     auth: {
    //         user: process.env.MAIL_ID, // generated ethereal user
    //         pass: process.env.MAIL_PASSWORD, // generated ethereal password
    //     },
    // });
    // // send mail with defined transport object
    // let info = await transporter.sendMail({
    //     from: '"Sasuke Sharingan👻" <teamigo.no.reply@outlook.com>', // sender address
    //     to: "user@gmail.com, baz@example.com , baz@example.com", // list of receivers
    //     subject: "testing nodemailer", // Subject line
    //     text: "just learning about nodemailer this using env ", // plain text body
    //     //html: "<b>Hello world? this froom express dude nust env</b>", // html body
    // });
    //res.json({ message: info })
    const result = await sendMail("omkr.g.0807@gmail.com", "this is a subject", "sending using function")
    console.log(result)
    res.json({ message: "success full bhai" })
}

exports.sendInvite = sendInvite
exports.getInvites = getInvites
exports.rejectInvite = rejectInvite
exports.acceptInvite = acceptInvite
exports.sendMail = sendMaile