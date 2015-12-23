var express = require('express');
var router = express.Router();

/*
 * GET faultlist.
 */
router.get('/faultlist', function(req, res) {
    var db = req.db;
    var collection = db.get('faultsTEST');
    // example = collection.find({}, {sort: {date: -1}, limit: 8}, function(e, docs){
    // original = collection.find({},{},function(e,docs){
    collection.find({},{sort: {_id: -1}, limit: 5},function(e,docs){
        res.json(docs);
    });
});


/*
 * GET devicefault.
 */
router.get('/devicefault', function(req, res) {
    var db = req.db;
    var collection = db.get('faultsTEST');
    // example = collection.find({}, {sort: {date: -1}, limit: 8}, function(e, docs){
    // original = collection.find({},{},function(e,docs){
    collection.find({},{sort: {_id: -1}, limit: 1},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to addfault.
 */
router.post('/addfault', function(req, res) {
    var db = req.db;
    var collection = db.get('faultsTEST');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deletefault.
 */
router.delete('/deletefault/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('faultsTEST');
    var faultToDelete = req.params.id;
    collection.remove({ '_id' : faultToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;