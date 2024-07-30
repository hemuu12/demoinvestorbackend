const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://hari:hari@cluster1.dlyqx9j.mongodb.net/demoinvestor?retryWrites=true&w=majority&appName=Cluster1', {
            useNewUrlParser: true,  
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
