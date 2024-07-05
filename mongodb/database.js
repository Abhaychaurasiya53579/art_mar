import mongoose from "mongoose";

let isConnected = false // Track the connection
console.log("abah");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));
export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log("MongoDB is connected successfully!")
    return
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "artify",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true

    console.log("MongoDB connected")
  } catch (err) {
    console.log(err)
  }
}