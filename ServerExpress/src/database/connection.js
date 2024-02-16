const mongoose = require('mongoose');

//MongoDB Connection
const connectDB = async () =>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected to host: ${con.connection.host}`);
    }
    catch (ex){
        console.log("MongoDB failed to connect: ", ex);
        process.exit(1);
    }
}

module.exports = connectDB