const express = require('express');
const fs = require('fs')
const router = express.Router();
const io = require('../socket')

router.get('/', (req, res, next) => {
    const color = JSON.parse(fs.readFileSync('color.json').toString()).color;
    res.json({ color })
})

router.post('/', (req, res, next) => {
    if (req.body.color == "yellow") {
        fs.writeFileSync('color.json', JSON.stringify({ color: 'yellow' }))
    } else if (req.body.color == "red") {
        fs.writeFileSync('color.json', JSON.stringify({ color: 'red' }))
    }
    io.getIO().emit('color', {
        action: 'change',
        color: JSON.parse(fs.readFileSync('color.json').toString()).color
    });
    const color = JSON.parse(fs.readFileSync('color.json').toString()).color;
    res.json({ color })
})

module.exports = router;