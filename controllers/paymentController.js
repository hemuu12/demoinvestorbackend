const User = require('../models/User');
const axios = require('axios');
const crypto = require('crypto');
const payuConfig = require('../config/payuConfig');

exports.purchaseTokens = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        console.log(user,"1111111111111")
        const { price } = req.body;

        // Determine the number of tokens based on price
        let tokens = 0;
        if (price === 1000) tokens = 1;
        else if (price === 2000) tokens = 2;
        else if (price === 5000) tokens = 5;
        else return res.status(400).json({ message: 'Invalid price' });

        const orderId = `order_${Date.now()}`;

        // Create hash string
        const hashString = `${payuConfig.key}|${orderId}|${price}|Token Purchase|${user.username}|${user.email}|||||||||||${payuConfig.salt}`;
        const hash = crypto.createHash('sha512').update(hashString).digest('hex');

        const paymentRequest = {
            key: payuConfig.key,
            txnid: orderId,
            amount: price,
            productinfo: 'Token Purchase',
            firstname: user.username,
            email: user.email,
            phone :"9675286699",
            surl: 'http://localhost:5000/api/payment/success',
            furl: 'http://localhost:5000/api/payment/failure',
            hash
        };
            console.log(paymentRequest,"000000000000")
        const paymentResponse = await axios.post('https://test.payu.in/_payment',paymentRequest);
                console.log(paymentResponse,"222222222222222")

        if (paymentResponse.status === 200) {
            // Assuming the payment is successful
            user.tokens += tokens;
            await user.save();
            res.json({ message: 'Tokens purchased successfully', tokens: user.tokens, paymentResponse: paymentResponse.data });
        } else {
            res.status(400).json({ message: 'Payment failed', paymentResponse: paymentResponse.data });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.paymentSuccess = async (req, res) => {
    try {
        const { txnid, status, key } = req.body;
        const user = await User.findOne({ email: req.body.email });

        if (status === 'success') {
            let tokens = 0;
            const amount = parseInt(req.body.amount);
            if (amount === 1000) tokens = 1;
            else if (amount === 2000) tokens = 2;
            else if (amount === 5000) tokens = 5;

            user.tokens += tokens;
            await user.save();
            res.json({ message: 'Payment successful', tokens: user.tokens });
        } else {
            res.status(400).json({ message: 'Payment failed' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.paymentFailure = (req, res) => {
    res.status(400).json({ message: 'Payment failed', data: req.body });
};
