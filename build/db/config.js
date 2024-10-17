import mongoose from "mongoose";
const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Mongodb connected");
    }).catch((error) => {
        console.log("error connected in mongodb", error);
    });
};
export default connectDB;
