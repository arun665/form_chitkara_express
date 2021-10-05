var express = require('express')
var router = express.Router()
var Product = require('../conn/product_schema')
var Review = require('../conn/review_schema');

var mongoose = require('mongoose');
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })
  // define the home page route
  router.get('/',async function (req, res) {

var products = await Product.find();

console.log(products);


    res.render('product',{products:products});
  })
  
router.get('/delete/:id1/:id2',async function(req,res){
try{
  var id=req.params.id1;
  var id2=req.params.id2;
  
  await Review.findByIdAndDelete(id);

  res.redirect("/products/"+id2);

}
catch(err){
  res.send(err);
}


});



  router.get('/:id',async function (req, res) {
try{
    var id=(req.params.id);
        

//populate method reference use krat h , review database ko isse product wale id se check krega or apne aap review wale databse se 
// data lake ussi id ka data product mein rkh dega


  var prod= await Product.findById(id).populate('reviews');
    
   console.log(prod);
   
        res.render('item',{products:prod,review:prod.reviews,message: req.flash("sucess")});
      
}
catch(err){
  res.send(err);
}
      
      })




router.post('/:id/review', async function(req,res){
try{
var id=req.params.id;
const prod=await Product.findById(req.params.id);

  const rating=req.body.rating;
  const comment=req.body.comment;

  console.log(rating);

  const review=new Review({rating:rating,comment:comment});
  prod.reviews.push(review);

  await prod.save();
  await review.save();
req.flash("sucess","Successfully created your review"); 

res.redirect("/products/"+id);







}
catch(err){
  res.send(err);
}
});

      
  
  // define the about route
  router.get('/about', function (req, res) {
    res.send('About birds')
  })
  
  module.exports = router;
