var express = require('express');
var router = express.Router();

/* GET home page. */
 router.get('/', function(req, res) {
   res.render('index', { title: 'CODE - FAULT SIMULATION' });
});

/* GET testpage. */
router.get('/testpage', function(req, res) {
  res.render('testpage');
});

module.exports = router;
