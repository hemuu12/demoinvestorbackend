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

// const express = require('express');
// const router = express.Router();
// const payuConfig = require('../config/payuConfig'); // Use the correct import here
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const auth = require('../middlewares/authMiddleware');

// router.post('/purchase', auth, async (req, res) => {
//     const { phone } = req.body;
//     const user = await User.findById(req.user.id);
//     const amount = 1000;  // Amount in currency's smallest unit
//     const orderId = `order_${Date.now()}`;
//     const paymentData = {
//         amount,
//         transactionId: orderId,
//         productinfo: 'Token Purchase',
//         email: user.email,
//         phone: phone,
//         firstname: user.name,
//         surl: 'http://localhost:5000/api/payment/success',
//         furl: 'http://localhost:5000/api/payment/failure'
//     };

//     payuConfig.pay(paymentData, (err, response) => {
//         if (err) {
//             return res.status(500).json({ message: 'Payment initiation failed', error: err });
//         }
//         res.json({ paymentResponse: response });
//     });
// });


// router.post('/success', (req, res) => {
//     res.json({ message: 'Payment successful', data: req.body });
// });

// // Failure route
// router.post('/failure', (req, res) => {
//     res.json({ message: 'Payment failed', data: req.body });
// });



// module.exports = router;
















// const express = require('express');
// const router = express.Router();
// const payu = require('../config/payu');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const auth = require('../middleware/auth');

// router.post('/purchase', auth, async (req, res) => {
//     const { phone } = req.body;
//     const user = await User.findById(req.user.id);
    
//     const paymentData = {
//         productinfo: 'Token Purchase',
//         txnid: 'unique_transaction_id', // generate a unique transaction ID
//         amount: '5000',
//         email: user.email,
//         phone: phone,
//         firstname: user.name,
//         surl: 'http://localhost:5000/api/payment/success',
//         furl: 'http://localhost:5000/api/payment/failure'
//     };

//     payu.pay(paymentData, (err, response) => {
//         if (err) {
//             return res.status(500).json({ message: 'Payment initiation failed', error: err });
//         }
//         res.json({ paymentResponse: response });
//     });
// });



// module.exports = router;
