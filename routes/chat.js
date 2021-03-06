var mongoose = require('mongoose');


exports.delete = function(req, res) {
    console.log(req.body.postID);
    mongoose.model('Posts')
        .remove({
            _id: req.body.postID
        }, function(data) {
            res.json({
                succ: "It worked"
            });
        });
}

exports.view = function(req, res) {
    console.log(req.user);
    if (req.user) {
        mongoose.model('Posts').find({}).sort({
            timeSinceE: -1
        }).exec(function(err, posts) {
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].user.username == req.user.username) {
                    posts[i].sameUser = true;
                }
                posts[i].numOfComments = posts[i].comments.length
            }
            if (err) {
                console.log("i have an err")

                console.log(err);
            } else {
                                console.log("postssss")

                console.log(posts)
                res.json({
                    'newsfeed': posts
                });
            }
        })
    } else {
        res.redirect("/");
    }
};