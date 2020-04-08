const express = require("express");
const db = require("./models");
var path = require("path");
const mongoose = require("mongoose");

const router = express.Router();

//api-routes=============================================================================

router.get("/api/workouts", (req, res) => {
    console.log("Get Route Hit!!");
    db.Workout.find({})
        .then(dbWorkout => {
            console.log("find all workouts executed successfully");
            console.log(dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
});

router.post("/api/workouts", (req, res)=>{
    console.log("api route, post");
    const workout = new db.Workout(req.body);
    workout.addDay();
    console.log(workout);
    db.Workout.create(workout)
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            console.log(err);
        })
});

router.put("/api/workouts/:id", (req, res) => {
    console.log("api route, put");
    console.log(req.body);
    db.Workout.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {$push: {exercises: req.body}}, { new: true }).then(data => {
        console.log("query executed");
        console.log(data);
        res.json(data);
    }).catch(err => {console.log(err); res.json(err);});
});

router.get("/api/workouts/range", (req, res)=>{
    console.log("api route, get , range");
    db.Workout.find({})
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
})

//html-routes===============================================================================

//serving exercise.html
router.get("/exercise", (req, res)=>{
    console.log("html route, get, exercise");
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

// serving stats.html
router.get("/stats", (req, res)=>{
    console.log("html route, get, stats");
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});

router.get("/", (req,res)=>{
    console.log("Here Here")
    res.sendFile(path.join(__dirname + "/public/index.html"));
})


module.exports = router;