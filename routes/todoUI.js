/**
 * Created by Sebastian on 19.01.2017.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('templates/todoUI');
});

module.exports = router;
