import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: String,
    age:  Number,
    classes:Number,
    dob :{
        day:Number,
        month:Number,
        year:Number
    }
});

const Teacher =   mongoose.model('Teacher', teacherSchema);

export default Teacher;