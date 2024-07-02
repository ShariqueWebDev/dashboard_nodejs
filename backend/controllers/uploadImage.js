const pool = require("../db")

const uploadImage = async (req, res)=>{
    try {
        const filePath = req.file.path
        const imageInsertQuery = `INSERT INTO image (image_path) VALUES ($1) RETURNING *`        
        const result = await pool.query(imageInsertQuery, [filePath])
        res.json({
            success:true,
            data:result.rows[0]
        })
    } catch (error) {
        console.error("Error uploading file: ", error);
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}
module.exports = uploadImage;