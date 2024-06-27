const express = require('express');
const noteRouter = express.Router();

noteRouter.get('/', (req, res)=>{
    res.send('Get Request')
})

noteRouter.post('/', (req, res)=>{
    res.send('Post Request')
});

module.exports = noteRouter;