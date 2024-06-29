const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const pool = require("./db");
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const deleteUser = require("./controllers/deleteUser");
const editUser = require("./controllers/editUser");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/api/user", userRouter);
app.use("/api/note", noteRouter);

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

app.get("/api/users", async (req, res) => {
  const response = await pool.query("SELECT * FROM users");
  return res
    .status(200)
    .json({ message: "Welcome to user page", data: response.rows });
  // res.status(200).send("Success");
});

app.post("/api/user/deleteuser", deleteUser);
app.post('/api/user/edituser', editUser)

app.listen(port, () => {
  console.log("Server Running on PORT " + port);
});

