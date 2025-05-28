import path from "path";
import express from "express";
import bookRouter from "./routes/book.route.mjs";
import dotenv from "dotenv";
import connectDB from "./config/db.config.mjs";
import userRouter from "./routes/user.route.mjs";
dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/books", bookRouter);
app.use("/api/auth", userRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
