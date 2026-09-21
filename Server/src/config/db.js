const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DB_NAME,
        });

        console.log(`Database : ${conn.connection.name}`);

        console.log("✅ MongoDB Connected Successfully");
        console.log(`📍 Host : ${conn.connection.host}`);
    } catch (error) {
        console.log("❌ Database Connection Failed");
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
