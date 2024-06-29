const pool = require("../db");

const deleteUser = async(req, res) =>{
    try {
        const {id} = req.body; 
        await pool.query('DELETE FROM users WHERE id=$1', [id])
        res.status(200).json(({status:200, message:"user has been deleted"}))

    } catch (error) {
        res.status(500).json({status:500, message:"failed to delete user"})
    }
}

module.exports = deleteUser