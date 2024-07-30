const express = require('express');
const { getToken } = require('../controllers/tokenController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:id', authMiddleware, getToken);

module.exports = router;
