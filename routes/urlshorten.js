var express = require('express');
var router = express.Router();
const URLShortener = require('../controllers/URLShortener').URLShortener;
const urlShortener = new URLShortener();


router.post('/shorten', urlShortener.shorten);
router.get('/:key', urlShortener.getURL);

module.exports = router;