const mongoose = require('mongoose');

const uri = "mongodb+srv://steve:restaurant2023@restaurant.tujo7ef.mongodb.net/restaurant?retryWrites=true&w=majority";

/**
 * @author STEVE
 * @function connect
 * @description Conectar a la base de datos MongoDB utilizando Mongoose.
 * @returns {undefined}
 */
const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log(`MongoDB Connected:`)
    }
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = {
    connect
};
