const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const env = require('dotenv').config()
const Routes = require('./routes/Routes');
const { HttpError } = require('./models/Model')
const app = express();
app.use(express.json());

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/', Routes);

app.use('*', (req, res, next) => {
    next(new HttpError("Given endpoint not available on server", 404))
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred" });
});

mongoose.set('useUnifiedTopology', true); //added to fix deprecation warnings 
mongoose
    .connect(
        process.env.MONGO_URL,
        { useNewUrlParser: true } //added to fix deprecation warnings 
    )
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => {
        //error message to be sent to frontend
        console.log(err);
    });

module.exports = app;

