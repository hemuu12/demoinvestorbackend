const Token = require('../models/Token');
const User = require('../models/User');

exports.getToken = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        console.log(user)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ tokens: user.tokens });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};
