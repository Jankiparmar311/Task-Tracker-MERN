const mongoose = require("mongoose");
//mongoose.pluralize(null);

//Task Schema
const taskSchema = mongoose.Schema({
    id : Number,
    task : String,
    day : String,
    reminder : Boolean,
});

const taskModel = mongoose.model("fullstack", taskSchema, "fullstack");

module.exports = taskModel;