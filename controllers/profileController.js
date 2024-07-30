const Profile = require('../models/Profile');
const User = require('../models/User');

exports.getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addProfiles = async (req, res) => {
    const { name, details } = req.body;

    if (!name || !details || typeof details !== 'object') {
        return res.status(400).json({ error: 'Name and details are required, and details must be an object' });
    }

    try {
        const newTycoon = new Profile({ name, details });
        await newTycoon.save();
        res.status(201).json(newTycoon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.accessProfile = async (req, res) => {
    try { 
        const user = await User.findById(req.userId);
        if (user.tokens < 1) return res.status(400).json({ message: 'Insufficient tokens' });

        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        user.tokens -= 1;
        user.purchasedProfiles.push(profile._id);
        await user.save();

        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
