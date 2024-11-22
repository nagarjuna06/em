import express from "express";
import connectDB from "./core/database.js";
import cors from "cors";
import router from "./routes/index.js";
import vars from "./core/config.js";
import errorMiddleware from "./middleware/error.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorMiddleware);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(vars.port, () =>
  console.log(`Server started at http://localhost:${vars.port}`)
);

connectDB();
