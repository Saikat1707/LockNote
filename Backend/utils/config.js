import mongoose from "mongoose";

export const DbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Database connected successfully to : ${process.env.MONGO_URI}`);
  } catch (err) {
    console.log(typeof(process.env.MONGO_URI))
    console.error(`❌ Error connecting to database: ${err.message}`);
    process.exit(1); 
  }
};
