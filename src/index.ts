import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "./generated/prisma";
export const prisma = new PrismaClient();

import express from "express";

const app = express();

import bookRouter from "./routes/route";

app.use(express.json());

app.use("/api/books", bookRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json();
});

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
