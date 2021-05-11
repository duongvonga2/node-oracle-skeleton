import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  autoIndex: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

export const connectDatabase = async () => {
  try {
    const database = await mongoose.connect(process.env.DATABASE_URI, options);
    console.log("Database connected");
    return database;
  } catch (error) {
    console.log("connect database error", error);
  }
};
