const mongoose = require('mongoose');
require('dotenv').config();
const uri = "mongodb+srv://"+process.env.DATA_USER+":"+process.env.DATA_PASSWORD+"@"+process.env.DATA_NAME+".tujo7ef.mongodb.net/"+process.env.DATA_NAME+"?retryWrites=true&w=majority";

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
