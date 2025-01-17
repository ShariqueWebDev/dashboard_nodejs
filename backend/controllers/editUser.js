const pool = require("../db");

const editUser = async (req, res) => {
  const { first_name, last_name, email, access_user, status, id } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET first_name=$1, last_name=$2, email=$3, access_user=$4, status=$5 WHERE id=$6",
      [first_name, last_name, email, access_user, status, id]
    );

    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error updating row:", error);
    res.status(500).json({ success: false, error: "Database update failed" });
  }
};

module.exports = editUser;
