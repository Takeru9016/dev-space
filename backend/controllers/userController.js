const { User, HttpError, asyncErrorHandler } = require("../models/Model")

const addUser = asyncErrorHandler(async (req, res, next) => {
    const { googleId, name, mailId } = req.body;
    const user = await User.findOne({
        googleId: googleId
    })
    if (user) {
        throw new HttpError("user already exists", 409)
    }
    const newUser = new User({
        googleId,
        name,
        mailId
    })
    const result = await newUser.save();
    if (!result) {
        throw new HttpError("adding user failed", 500)
    }
    res.json({ message: "User created successfully." });
})

const getAllUsers = async (req, res, next) => {
    const result = await User.find();
    let arr = [];
    result.forEach(element => {
        const { _id, name } = element;
        arr.push(
            {
                _id, name
            }
        )
    });
    res.json({ result: arr })
}

const getMongoIdByGoogleId = asyncErrorHandler(async (req, res, next) => {
    const { googleId } = req.body
    const result = await User.findOne({
        googleId: googleId
    });
    if (!result) {
        throw new HttpError("user not found", 404)
    }
    res.json({ _id: result._id })
})

exports.addUser = addUser;
exports.getAllUsers = getAllUsers
exports.getMongoIdByGoogleId = getMongoIdByGoogleId