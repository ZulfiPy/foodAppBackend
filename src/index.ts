import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();

app.use('/test', async (req: Request, res: Response) => {
    res.send('hello world')
})

app.listen(process.env.PORT, () => {
    console.log(`server runs on port ${process.env.PORT}`)
});