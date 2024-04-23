import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import { config } from "dotenv";

import clientRouter from "./routes/clientRouter.js";
import managerRouter from "./routes/managerRouter.js";
config();

const { MONGODB_URI, PORT, CORS_ALLOW_ORIGIN } = process.env;

const app = express();
app.use(
  cors({
    origin: CORS_ALLOW_ORIGIN,
    optionSuccessStatus: 200,
  })
);
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/client", clientRouter);
app.use("/api/manager", managerRouter);

// throw Error
app.use((err, req, res, next) => {
  if (err) {
    const { status, msg, code } = err;
    return res.status(status).json({ msg, code });
  }
  return res.status(500).json({ errors: { msg: "관리자 문의" } });
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  });
