var mongoose = require("mongoose")

var questionSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        firstName: String
    }
})

module.exports = mongoose.model("Question", questionSchema)