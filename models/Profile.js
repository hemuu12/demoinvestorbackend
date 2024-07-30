const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    number: { type: String, required: true }, // Number field
    companyName: { type: String, required: true }, // Company name field
    address: { type: String, required: true }, // Address field
});

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    details: detailSchema,
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
