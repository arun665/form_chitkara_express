const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/mongodb_chitkara_form")
.then(function(){
    console.log(" this is running successfully");
})
.catch(function(error){
    console.log(error);

});

const user = new mongoose.Schema({
rating:{
    type:Number
},
comment:{
    type:String
}
})




const Review = mongoose.model('Review', user);






module.exports=Review;