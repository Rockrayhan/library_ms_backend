import express, { Application, Request, Response } from "express";

import cors from 'cors';
import { router } from "./app/routes";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://next-portfolio-frontend-pi.vercel.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


// app.use("/api/books", booksRouter);

app.use("/api", router)


// app.use("/api/", borrowRouter);




app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
