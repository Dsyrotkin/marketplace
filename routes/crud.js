var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var config = require('../config');

mongoose.connect(config.database, {
    useMongoClient: true,
});

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    username: String,
    category: String,
    sold: Boolean,
    location: { state: String, city: String, zip: String },
    contact: String,
    created_at: Date,
    updated_at: Date,
    imageUrl: String});
const PostModel = mongoose.model('post', postSchema);

let postList = [];

router.get('/post', function(req, res, next) {

    PostModel.find({}, function(err, postData){

        console.log(postData);
        res.send(JSON.stringify(postData));
    });

});

router.get('/post/:id', function(req, res, next){
    console.log("get:" + req.params.id);
    PostModel.findOne({_id: req.params.id}, function(err, data){
        res.send(data);
    });
});

router.post('/post', function(req, res, next){

    let post = new PostModel(req.body);

    post.save();
    PostModel.find(function(err, postData){

        res.send(JSON.stringify(postData));
    });

});

router.post('/post/:id', function(req, res, next){

    PostModel.findOneAndUpdate({_id: req.params.id}, req.body, function(err, data){
        if (err) res.send(JSON.stringify(err));
        console.log('User successfully updated!');
        res.send(JSON.stringify(data));
    });

});

router.delete('/post/:id', function(req, res, next){
    PostModel.findByIdAndRemove({_id: req.params.id}, function(err, data){
        if (err) throw err;
        console.log('Post successfully removed!');
        res.send(JSON.stringify(data));
    });
});

module.exports = router;
