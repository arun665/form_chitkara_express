const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/mongodb_chitkara_form")
.then(function(){
    console.log(" this is running successfully");
})
.catch(function(error){
    console.log(error);

});

const user = new mongoose.Schema({
name:String,
email:String,
address:[
    {
    street:String,
    state:String,
    country:String
    }
]

})




const Customer = mongoose.model('User', user);

async function add(){

const User= await Customer.findById("6155f482dc5ea2ff8a61cd33");
User.address.push({street:"arun sharma",state:"punava",country:"engklanf"});
await User.save((err)=>{
if(err){
    console.log(err);

}
{
console.log("added success")
}
});

}

add();


module.exports=Customer;