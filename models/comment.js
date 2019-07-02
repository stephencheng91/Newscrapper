var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    //user name
    userName: {
        type: String,
        required: true
    },
    body: {
        type: String,
        require: true
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;