var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost/marketplace', {
    useMongoClient: true,
});

const categorySchema = new mongoose.Schema({
    category: {type: String, unique: true}});

const categoryModel = mongoose.model('category', categorySchema);

let categoryList = [];

router.get('/category', function(req, res, next) {

    categoryModel.find({}, function(err, categoryData){

        // console.log(categoryData);
        res.send(JSON.stringify(categoryData));
    });

});

router.get('/category/:id', function(req, res, next){
    // console.log("get:" + req.params.id);
    categoryModel.findOne({_id: req.params.id}, function(err, data){
        res.send(data);
    });
});

router.post('/category', function(req, res, next){

    let category = new categoryModel(req.body);

    category.save();
    categoryModel.find(function(err, categoryData){
        // console.log('Category successfully added!');
        // console.log(categoryData);
        res.send(JSON.stringify(categoryData));
    });

});

router.post('/category/:id', function(req, res, next){

    categoryModel.findOneAndUpdate({_id: req.params.id}, req.body, function(err, data){
        if (err) res.send(JSON.stringify(err));
        // console.log('User successfully updated!');
        res.send(JSON.stringify(data));
    });

});

router.delete('/category/:id', function(req, res, next){
    categoryModel.findByIdAndRemove({_id: req.params.id}, function(err, data){
        if (err) throw err;
        // console.log('User successfully removed!');
        res.send(JSON.stringify(data));
    });
});

module.exports = router;
