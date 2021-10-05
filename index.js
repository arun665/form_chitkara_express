const express = require("express");
const app=express();
var flash = require('connect-flash');
var bodyParser = require('body-parser');
const cookieParser=require('cookie-parser'); 
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views','./views');
const mongoose=require('mongoose');
var User=require('./conn/user');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

 var session = require('express-session')
 var products = require('./routes/products');
 var authroutes= require('./routes/user');
 
const passport =require('passport');
const LocalStrategy=require("passport-local");


 app.use(session({
    secret: 'keyboard_asdascat',
    resave: false,
    saveUninitialized: true,
    
  }))
  app.use(flash());
app.use('/products', products);
app.use('/auth',authroutes);

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// parse application/json
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');
var Validation=function(req,res,next){
    console.log("middleqwaer working");
    next();
}
app.get("/",Validation, (req,res)=>{
 
  if(req.session.count){
      req.session.count+=1;
  }
  else{
      req.session.count=1;
  }
    res.render('index',{title:"form"+req.session.count});
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

app.listen(3000,()=>{
    console.log("sever running on port");
});
