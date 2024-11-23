import mongoose from "mongoose";

const DBConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
    console.log(`DB connected!! Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGO_DB connection error:", error);
    process.exit(1);
    // throw error
  }
};
export default DBConnection;
