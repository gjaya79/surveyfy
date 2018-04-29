var mongoose = require("mongoose")

var questionSchema = mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    content:String
})

module.exports = mongoose.model("Option", questionSchema) 