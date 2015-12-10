var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'CODE - FAULT SIMULATION' });
});

module.exports = router;
