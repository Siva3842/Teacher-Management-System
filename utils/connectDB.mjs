import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbURL = process.env.DB_URL;

        await mongoose.connect(dbURL);

        console.log("Connected to DB");
    } catch(err) {
        console.log("Error while connecting to DB");
    }
};

export default connectDB;