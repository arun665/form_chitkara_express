const express = require("express");
const app=express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views','./views');
const mongoose=require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
 var Customer = require('./schema.js');
 //var products = require('./routes/products');


// ...

//app.use('/products', products);
// parse application/json
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');
var Validation=function(req,res,next){
    console.log("middleqwaer working");
    next();
}
app.get("/",Validation, (req,res)=>{
    res.render('index',{title:"Booking Form "});
});

app.post("/submit",body('username').isEmail(),
body('password').isLength({ min: 5 })  , body('phone').isMobilePhone(),(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body.username);
    const kitty = new Customer({ username:req.body.username,password:req.body.password ,entry_time:req.body.entry_time,leave_time:req.body.leave_time});
    kitty.save().then(() => {console.log('meow');






                 res.render('submit',{title:"Your data has been saved successfully , you will recevie mail from our side shortly",username:req.body.username,password:req.body.password});
                 console.log('Email sent successfully');
          

            







    
}).catch((err)=>{
console.log(err);
    res.render('submit',{title:"sonme error shown",username:req.body.username,password:req.body.password});
    
})
    
})

app.listen(3000||process.env.PORT,()=>{
    console.log("sever running on port");
});
