const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true,
    },
    gender : {
        type : String,
        required : true,
    },
    hobby : {
        type : Array,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
})

const Student = mongoose.model('Student',StudentSchema);

module.exports = Student;