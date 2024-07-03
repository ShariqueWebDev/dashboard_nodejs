const pool = require("../db");

const apiForDeleteImage = async (req, res) => {
  try {
    const { id } = req.body;
    await pool.query(`DELETE FROM image WHERE id=$1`, [id]);
    res.status(200).json({ status: true, message: "image deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

module.exports = apiForDeleteImage;
