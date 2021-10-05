const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');




const User_Schema = new Schema({

email:{

    required:true,
    type:String,
    unique:true,
    trim:true
}


});

User_Schema.plugin(passportLocalMongoose);
const User = mongoose.model('User',User_Schema);

module.exports = User;