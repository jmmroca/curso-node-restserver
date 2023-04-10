const mongoose = require('mongoose');
//const dotenv = require('dotenv');

const dbConnection = async() => {

    console.log(`La variable MONGODB_CNN vale ${process.env.MONGODB_CNN}`);
    try {
     
    //     await mongoose.connect(process.env.MONGODB_CNN, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true
    //    });

        await mongoose.connect('mongodb+srv://user_node_cafe:mYafOnBkdTDh1Rod@cluster0.xuahyky.mongodb.net/cafeDB');

        console.log('Base de datos online');
    } catch (error) {
        console.log(Error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }

}

module.exports = {
    dbConnection
}