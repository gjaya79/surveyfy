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
    },
    silderMax:{
        type:String,
        default:0
    },
    silderMin:{
       type:String,
       default:100
    },
    options:[{
        content: {
            type: String
        }
    }]
})

module.exports = mongoose.model("Question", questionSchema)