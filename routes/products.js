var express = require('express')
var router = express.Router()
var Product = require('../conn/product_schema')
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
  




  router.get('/:id',async function (req, res) {

    var id=(req.params.id);
        var products =await Product.findById(id);
    
    console.log(products);
    
    
        res.render('item',{products:products});
      })
      
  
  // define the about route
  router.get('/about', function (req, res) {
    res.send('About birds')
  })
  
  module.exports = router;
