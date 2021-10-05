const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/mongodb_chitkara_form")
.then(function(){
    console.log(" this is running successfully");
})
.catch(function(error){
    console.log(error);

});

const user = new mongoose.Schema({



url:String,
desc:String,
title:String,
Price:String,
reviews:[
{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Review',
}
]

})




const Product = mongoose.model('Product', user);

async function add(){

const User= new Product({url:"https://drop.ndtv.com/TECH/product_database/images/913201720152AM_635_iphone_x.jpeg?downsize=*:180",desc:"iphone",title:"iphone",Price:"200"});

await User.save((err)=>{
if(err){
    console.log(err);

}
{
console.log("added product  success")
}
});

}




module.exports=Product;