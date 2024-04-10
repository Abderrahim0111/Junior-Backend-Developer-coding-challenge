const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/authRoutes");
const threadRouter = require("./routes/threadRoutes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(authRouter);
app.use(threadRouter);


mongoose
  .connect(
    "mongodb+srv://abderrahimdefaoui:PPlFRbNDyJhm5B0Y@cluster0.udyotvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => { 
    app.listen(port, () => {
      console.log(`http://localhost:${port}`); 
    });  
  })
  .catch((err) => {
    console.log(err);
  });
