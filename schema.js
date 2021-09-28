const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://mongodb:Arun1117@cluster0.spwl1.mongodb.net/mongodb_chitkara_form?retryWrites=true&w=majority",{useNewUrlParser:true , useUnifiedTopology:true})
.then(function(){
    console.log(" this is running successfully");
})
.catch(function(error){
    console.log(error);

});

const user = new mongoose.Schema({
name:String,
email:String,
password:String,
phone:String,
entry_time:String,
leave_time:String,
day:String


})


const Customer = mongoose.model('Customer', user);
module.exports=Customer;