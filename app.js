const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/v1");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const { fileParser } = require("express-multipart-file-parser");
const httpStatus = require("http-status");

const app = express();

app.use(morgan("tiny"));

app.use(express.json());

app.use(
  fileParser({
    rawBodyOptions: {
      limit: "30mb", //file size limit
    },
    busboyOptions: {
      limits: {
        fields: 50, //Number text fields allowed
      },
    },
  })
);

app.use(cors());
app.options("*", cors());

app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found Sedly"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
