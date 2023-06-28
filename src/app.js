const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

//init middle wares
// đầu ra ngắn gọn: status có màu/  thời gian phản hồi => chỉ dùng lúc dev
app.use(morgan("dev"));

// Đầu ra full thông tin: request's ip/ time/ phương thức/ status/ kiểu request.
// app.use(morgan('combined'))

// cũng như combined nhưng k biết dùng gì để gửi request
// app.use(morgan('common'))

// ngắn hơn
// app.use(morgan('short'))

// ngắn nhất.
// app.use(morgan('tiny'))

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init db
require("./dbs/init.mongodb");

// init routes
app.use("/", require("./routes"));

// handling errors

//404 not found routes
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;

  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
