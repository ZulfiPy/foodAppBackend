import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import myUserRoute from "./routes/api/myUserRoute";

const app = express();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.DATABASE_URI;

mongoose.connect(MONGODB_URI as string).then(() => {
    console.log('mongo database is connected');
});

app.use(express.json());

app.use(cors());

app.use('/api/my/user', myUserRoute);

app.listen(PORT, () => {
    console.log(`server runs on port ${PORT}`)
});