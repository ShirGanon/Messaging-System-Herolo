import mongoose from 'mongoose';
import dotenv from 'dotenv';

const env = dotenv.config();
const connectionString = process.env.CONNECTION_STR;

try {
  (async () => {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");
  })();
} catch (error) {
  console.log("error: ",{
    message: `Failed to connect to the database, message: '${error.message}'`,
    stack: error.stack,
  });
}
