const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const pool = require("./db");
const userRouter = require("./routes/userRoutes");
const uploadImage = require("./controllers/uploadImage");
const deleteUser = require("./controllers/deleteUser");
const editUser = require("./controllers/editUser");
const multer = require("multer");
const getApiImage = require("./controllers/getApiImage");
const getApiImages = require("./controllers/getApiImage");

//Common Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// MIDDLEWARE FOR UPLOAD IMAGES
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "images");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  }),
}).single("image_file");

app.use("/api/user", userRouter);
app.post("/api/image/upload", upload, uploadImage);

app.get("/api/image/getimage", async (req, res) => {
  try {
    const response = await pool.query(`SELECT * FROM image`);
    return response.status(200).json({
      success: true,
      data: response.rows,
      message: "data fetched completed",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.post("/api/user/deleteuser", deleteUser);
app.post("/api/user/edituser", editUser);

app.get("/", (req, res) => {
  return res.send("Hello index js ");
});

// USER SIGN IN
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

// GET ALL USERS
app.get("/api/users", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM users");
    return res
      .status(200)
      .json({
        success: true,
        message: "Welcome to user page",
        data: response.rows,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("Server Running on PORT " + port);
});
