var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {

  console.log("start");

  fs.writeFileSync('./message.txt', 'hello world!');

  res.send('hello world!');
});

module.exports = router;
