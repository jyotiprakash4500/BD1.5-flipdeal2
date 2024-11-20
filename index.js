const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

//server-side value
let taxRate=5;//5%
let discountPercentage=10;//10%
let loyaltyRate=2;//2 points per $1
//Endpoint 1: Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  let newItemPrice=parseFloat(req.query.newItemPrice);
  let cartTotal=parseFloat(req.query.cartTotal);
  let result=newItemPrice+cartTotal;
  res.send(result.toString());
});
//Endpoint 2 : Apply a discount based on membership status
app.get("/membership-discount",(req,res)=>{
let cartTotal=parseFloat(req.query.cartTotal);
let isMember=req.query.isMember==="true";
let result;
if (isMember){
  result=cartTotal-(cartTotal/discountPercentage) ;
}
else {
  result="no discount applicable";
}

res.send(result.toString());

});
//Endpoint 3 : Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  let cartTotal=parseFloat(req.query.cartTotal);
  let result=(taxRate/100)*cartTotal;
  res.send(result.toString());
});
//Endpoint 4 : Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod=req.query.shippingMethod;
  let distance=parseFloat(req.query.distance);
  let standard;
  let express;
  let result;
  if (shippingMethod==="standard"){
    result=distance/50;
  }
  else if( shippingMethod==="express"){
    result=distance/100;
  }
  else{
    result="invalid shippingMethod";
  }
  res.send(result.toString());
});
//Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight=parseFloat(req.query.weight);
  let distance=parseFloat(req.query.distance);
  let result=weight*distance*0.1;
  res.send(result.toString());
});
//Endpoint 6 : Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount=parseFloat(req.query.purchaseAmount);
  let result=purchaseAmount*2;
  res.send(result.toString());
});


function calculateCartTotal (newItemPrice, cartTotal){
  cartTotal = cartTotal + newItemPrice;
  return cartTotal;
}

app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  
  res.send(calculateCartTotal(newItemPrice,cartTotal).toString());
});


//  const cors = require(‘cors’)
//  app.use(cors());





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
