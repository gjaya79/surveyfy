var mongoose = require("mongoose")

var questionSchema = mongoose.Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    instruction: String,
    image: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        firstName: String
    },
    types:{
        type:Number,
        default:1
    }
})

module.exports = mongoose.model("Question", questionSchema)