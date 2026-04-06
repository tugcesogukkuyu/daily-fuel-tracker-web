const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rootRouter = require("./routes");
const environmentConfig = require("./config/env");

const app = express();

/*
  Global middlewares
  Uygulamanin genel middleware ayarlarini tanimlar.
*/
app.use(
  cors({
    origin: environmentConfig.clientUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/*
  API routes
  Tum uygulama endpointlerini /api altinda toplar.
*/
app.use("/api", rootRouter);

module.exports = app;
