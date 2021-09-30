const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

const path = require("path");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const reactRoutes = require("./routes/reactLikeDislike");

dotenv.config({ path: "./config.env" });

const helmet = require("helmet");
const xssClean = require("xss-clean");
const hpp = require("hpp");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/post/:postId/comment", commentRoutes);
app.use("/api/post/:postId/react", reactRoutes);

app.use(function (err, req, res, next) {
  console.log("This is the invalid field ->", err.field);
  next(err);
});

app.use(helmet());
app.use(xssClean());
app.use(hpp());

module.exports = app;
