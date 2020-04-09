// requiring all the necessary packages

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./app");

// Set up the port
const PORT = process.env.PORT || 3000;

// configure the express app
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

// connect to the workout database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.use(routes);

// start listening for requests
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})