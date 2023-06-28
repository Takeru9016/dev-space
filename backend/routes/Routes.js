const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
const eventController = require("../controllers/eventController")
const inviteController = require("../controllers/inviteController")
const teamController = require("../controllers/teamController")
const participantController = require("../controllers/participantController")
const requestController = require("../controllers/requestController")

//user Routes
router.post("/users/addUser", userController.addUser);
router.get("/users/getAllUsers", userController.getAllUsers);
router.post("/users/getMongoIdByGoogleId", userController.getMongoIdByGoogleId);

//Event Routes
router.post("/events/addEvent", eventController.addEvent);
router.get("/events/getEvents", eventController.getEvents);


//Team Routes
router.post("/teams/addTeam", teamController.addTeam);
router.post("/teams/getTeamsByEventId", teamController.getTeamsByEventId);
router.post("/teams/getTeamsByTeamLeaderId", teamController.getTeamsByTeamLeaderId);

//Participant and Team
router.post("/participant/addParticipantAndTeam", participantController.addParticipantAndTeam);
router.post("/participant/getParticipantsByEventId", participantController.getParticipantsByEventId);

//Invites Routes
router.post("/invites/sendInvite", inviteController.sendInvite);
router.post("/invites/getInvites", inviteController.getInvites);
router.post("/invites/rejectInvite", inviteController.rejectInvite);
router.post("/invites/acceptInvite", inviteController.acceptInvite);
router.get("/invites/mail", inviteController.sendMail);

//Requests Routes
router.post('/requests/sendRequest', requestController.sendRequest)
router.post('/requests/getRequestsByUserId', requestController.getRequestsByUserId)
router.post('/requests/acceptRequest', requestController.acceptRequest)
router.post('/requests/rejectRequest', requestController.rejectRequest)

module.exports = router;
