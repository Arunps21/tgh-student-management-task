import mongoose from "mongoose";

// Connect to MongoDB using the connection string from environment variables
mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.message);
  });

export default mongoose.connection;
