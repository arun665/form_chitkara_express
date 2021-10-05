var mongoose = require('mongoose');
var express = require('express');
var User= require('../conn/user');
var router = express.Router()
var passport = require('passport');
var passport_local=require("passport-local");

const session = require('express-session');
const bodyParser = require('body-parser');
router.post('/register',async function(req,res){
    try{
        var username=req.body.username;
        var email=req.body.email;
        var password=req.body.password;
        const user=new User({
            username:username,
            email:email
        });
        const newUSer=await User.register(user,password);
       
        req.flash("sucess","welcome"+ username + " , please login to continue"); 
        res.render('./auth/signup',{message:req.flash("sucess"),error:req.flash("error")});  
        }
        catch(err){
            req.flash("error",username+"  alrady exist"); 
            res.render('./auth/signup',{message:req.flash("sucess"),error:req.flash("error")});  
        
        }


})

router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login' , failureFlash:true}),  
function(req, res) {
	
	res.redirect('/');
});




router.get('/register',async function(req,res){
try{

    res.render('./auth/signup',{message:req.flash("sucess"),error:req.flash("error")})

}
catch(err){
    res.send(err);

}

});


router.get('/login',async function(req,res){
    try{
    
        res.render('./auth/login',{message:req.flash("sucess"),error:req.flash("error")})
    
    }
    catch(err){
        res.send(err);
    
    }
    
    });

module.exports=router;