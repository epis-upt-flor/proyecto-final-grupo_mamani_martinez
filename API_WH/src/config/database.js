const mongoose = require('mongoose');

const uri = "mongodb+srv://username:password@cluster.mongodb.net/your-db-name?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("You successfully connected to MongoDB using Mongoose!");
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

module.exports = {
    connect
};
