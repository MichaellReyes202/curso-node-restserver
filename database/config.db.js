
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        // process.env.MONGODB_CNN
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos ONLINE');
    } catch (error) {
        console.log(error)
        throw new Error('Error a la iniciar la base de datos');
    }
}
module.exports = {
    dbConnection
}

            // useCreateIndex: true,
            // usefindAndModify: false 