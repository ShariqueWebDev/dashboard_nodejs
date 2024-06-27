const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "shaSTTOKENKEY";
const pool = require("../db");
const sendEmailController = require("./sendEmail");

// SIGN UP ROUTES FUNCTION
const signup = async (req, res) => {
  // Missing Fields
  // Exsiting User check
  // Hashed Password
  // User Creation
  // Token Generate
  const { firstname, lastname, email, password } = req.body;

  try {
    // Missing Fields
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "missing required fields" });
    }

    //check existing user
    const existingUserQuery = `SELECT * FROM users WHERE email = $1`;
    const existingUserQueryResult = await pool.query(existingUserQuery, [
      email,
    ]);

    if (existingUserQueryResult.rows.length > 0) {
      return res.status(400).json({ message: "user already exist" });
    }

    //create hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const insertUserQuery = `INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *`;
    const insertUserQueryResponse = await pool.query(insertUserQuery, [
      email,
      hashedPassword,
      firstname,
      lastname,
    ]);

    const user = insertUserQueryResponse.rows[0];

    const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY);
    sendEmailController(user?.email, user?.name)

    return res.status(201).json({ user: user, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

// SIGN IN ROUTES FUNCTION
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "missing required field" });
    }

    // Check existing user
    const checkExistingUserQuery = await pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [email]
    );
    if (checkExistingUserQuery.rows.length === 0) {
      return res.status(400).json({
        message: "User is not registered, Sign up first",
      });
    }

    const compareHashPassword = await bcrypt.compare(
      password,
      checkExistingUserQuery.rows[0].password
    );

    // console.log(compareHashPassword);
    // Compare hash password
    if (!compareHashPassword) {
      return res.status(500).json({ message: "Password is incorrect" });
    }

    // const compareUserToken = jwt.sign({ email: email }, SECRET_KEY);
    return res.status(200).json({
      message: "User Signed In",
      userData: checkExistingUserQuery.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error...." });
  }
};

module.exports = { signin, signup };
