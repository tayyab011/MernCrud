import express from "express";

import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import router from "./src/routes/api.js";
import {
  JWT_KEY,
  JWT_EXPIRATION_TIME,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  MAIL_ENCRYPTION,
  MAX_JSON_SIZE,
  URL_ENCODED,
  REQUEST_TIME,
  REQUEST_NUMBER,
  WEB_CACHE,
} from "./src/config/config.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({});

const app = express();

const _dirname = path.resolve();


const corsOptions = {
  origin: "https://merncrud-kjyp.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(hpp());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(cookieParser());
const limiter = rateLimit({
  windowMs: REQUEST_TIME,
  max: REQUEST_NUMBER,
});
app.use(limiter);

app.set("etag", WEB_CACHE);

app.use("/api", router);
/* app.use(express.static("storage")); */
app.use("/upload-file", express.static("uploads"));

app.use(express.static(path.join(_dirname, "/client/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

mongoose
  .connect(process.env.database, { autoIndex: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB");
  });

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
