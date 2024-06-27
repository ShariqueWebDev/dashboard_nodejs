const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const pool = require("./db");
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const sendEmail = require("./routes/sendEmail");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/user", userRouter);
app.use("/note", noteRouter);
app.use("/email", sendEmail);

app.get("/", (req, res) => {
  return res.send("Hello index js ");
});

app.get("/user/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await pool.query(
      `SELECT * FROM users WHERE email=$1 AND password=$2`,
      [email]
    );
    const user = response.rows;
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in get sign in request" });
  }
});

// Mounting Routes
// app.use('/api', routes)

// app.post("/api/register", (req, res) => {
//   console.log("Welcome to register page");
//   res.json({ message: "Welcome to register page" });
// });
// app.post("/api/login", (req, res) => {
//   console.log("Welcome to login page");
//   res.json({ message: "Welcome to login page" });
// });
app.get("/api/users", async (req, res) => {
  const response = await pool.query("select * from users");
  return res
    .status(200)
    .json({ message: "Welcome to user page", data: response.rows });
  // res.status(200).send("Success");
});

app.listen(port, () => {
  console.log("Server Running on PORT " + port);
});
