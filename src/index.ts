import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "./generated/prisma";
export const prisma = new PrismaClient();

import express from "express";

const app = express();

import bookRouter from "./routes/route";

import errorHandlerMiddleware from "./middleware/error-handler";
import NotFound from "./middleware/not-found";

app.use(express.json());

app.use("/api/books", bookRouter);

app.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

app.use(NotFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

async function shutdown(): Promise<void> {
  try {
    console.log("Shutting down prisma...");
    await prisma.$disconnect();
    server.close(() => {
      console.log("Shutting down server...");
      process.exit(0);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default prisma;
