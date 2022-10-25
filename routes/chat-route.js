var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/chat.html'));
});

router.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/chat.html'));
});

module.exports = router;