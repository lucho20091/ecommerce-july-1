// dotenv:
// DATABASE_URL
// JWT_SECRET
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
// DB connection
connectDB();

const app = express();
// middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://test22.lucho.uk"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
    }),
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});
// Routes
app.use("/api/users", require("./routes/users"));

app.listen(3000, () => {
  console.log(`Server is running on port 5000`);
});
