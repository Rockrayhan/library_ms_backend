import express, { Application, Request, Response } from "express";

import { borrowRouter } from "./app/modules/borrow/borrow.controller";
import cors from 'cors';
import { router } from "./app/routes";

const app: Application = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://lms-frontend-gray-iota.vercel.app" , "https://library-ms-6969.netlify.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use("/api/books", booksRouter);

app.use("/api", router)


app.use("/api/", borrowRouter);




app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
