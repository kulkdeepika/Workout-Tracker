const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        required: true
    },
    // exercises: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Exercise"
    //     }
    // ]

    exercises: [{
        type: {
            type: String
        },
        name: {
            type: String
        },
        duration: {
            type: Number
        },
        distance:{
            type: Number
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        }
    }]
});

workoutSchema.methods.addDay = function(){
    this.day = new Date().setDate(new Date().getDate());
    return this.day;
}


const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

