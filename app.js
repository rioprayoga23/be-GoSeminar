const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());

//* router
const categoriesRouter = require("./app/api/v1/categories/router");
const imagesRouter = require("./app/api/v1/images/router");
const talentsRouter = require("./app/api/v1/talents/router");
const eventRouter = require("./app/api/v1/events/router");

//* middlewares
const notFoundMiddleware = require("./app/middlewares/not-found");
const handlerErrorMiddleware = require("./app/middlewares/handler-error");

const v1 = "/api/v1/cms";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to API GoSeminar!...",
  });
});

app.use(v1, categoriesRouter);
app.use(v1, imagesRouter);
app.use(v1, talentsRouter);
app.use(v1, eventRouter);

//* use middleware
app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);

module.exports = app;
