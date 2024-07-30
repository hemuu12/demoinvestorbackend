const express = require('express');
const { getProfiles, accessProfile , addProfiles } = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getProfiles);
router.post('/add', addProfiles);
router.post('/access/:id', authMiddleware, accessProfile);

module.exports = router;
