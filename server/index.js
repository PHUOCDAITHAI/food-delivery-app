require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.post('/pay', async(req, res) => {
    try {
        const {email, cartPrice, fullName, address, cell} = req.body;
        const customer = await stripe.customers.create({
            email: email,
        })
        if(!email || !address) return res.status(400).json({ message: "Xin vui lòng nhập đầy đủ số điện thoại và địa chỉ"});
        const paymentIntent = await stripe.paymentIntents.create({
            amount: cartPrice,
            currency: 'VND',
            receipt_email: email,
            payment_method_types: ["card"],
            metadata: {email, cell},
            shipping: {
                name: fullName,
                address: {
                    line1: address
                }
            }
        });
        const clientSecret = paymentIntent.client_secret; 
        res.json({message: 'Payment initiated', clientSecret})
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error'})
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
