const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Bizar",{useNewUrlParser:true})

const db = mongoose.connection;

db.once('open',()=>{
    console.log('Successfully connectec to the database');
});

const teacherSchema = mongoose.Schema({
    firstName:{
        required:true,
        type:String
    },
    lastName:{
        required:true,
        type:String
    },
    MobileNumber:{
        required:true,
        type:Number
    },
    Email:{
        required:true,
        type:String
    },
    Password:{
        required:true,
        type:String
    }
});

const Teacher = mongoose.model('Teacher',teacherSchema);


module.exports = Teacher;