const express = require('express');
const { purchaseTokens, paymentSuccess, paymentFailure } = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/purchase', authMiddleware, purchaseTokens);
router.post('/success', paymentSuccess);
router.post('/failure', paymentFailure);

module.exports = router;
