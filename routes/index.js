var express = require('express');
var router = express.Router();

/* GET home page. */
 router.get('/', function(req, res) {
   res.render('index');
});

/* GET debug page. */
router.get('/debug', function(req, res) {
  res.render('debug', { title: 'CODE - FAULT DEBUGER' });
});

module.exports = router;
