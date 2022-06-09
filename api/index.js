require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.post('/api/payments', async (req,res) => {
  try{
    const charge = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      source: 'tok_mastercard',
      description: 'Rabbit Mart',
    });
    return res.status(200).json({
      success: true,
      message: 'Payment Successful',
      id: charge.id
    });
  } catch(error) {
  console.log("Error ", error)
    return res.status(200).json({
      success: true,
      message: 'Payment Failed',
    })
  }
});


app.listen(3000);
