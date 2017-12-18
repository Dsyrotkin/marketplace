var express = require('express');
var router = express.Router();

var cds = [];
/* GET users listing. */
router.get('/cd', function(req, res, next) {
    res.send(JSON.stringify(cds));

});

router.post('/cd', function(req, res, next){
    cds.push(req.body);
    console.log(req.body);
    console.log(cds);
    res.send(JSON.stringify(cds));

});

module.exports = router;
