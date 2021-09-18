const mongoose = require("mongoose");
let debug = require('debug')('application');

mongoose.connection.on("error", error=> {
    console.log(`mongodb connection is failed ${error.message}`);
});

module.exports = async () => {
    await mongoose.connect(process.env.MANGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    });
    debug("Connected to the mango")
}   