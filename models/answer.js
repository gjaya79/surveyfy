/*
Author: Avinash Reddy
Edited:Yuxuan He
Date: 07/05/2018
*/

// Schema that create and store the answers from respodents.
var mongoose = require("mongoose")

var respondentsSchema = mongoose.Schema({
    survey:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey'
    },
    createdAt: {type: Date, default: Date.now},
    cliWidth: {
        type: String
    },
    cliHeight: {
        type: String
    },
    exceptTime:{
        type: String,
    },
    totalAnswerTime:{
        type:String
    },
    answers:[{
        qid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
         },
        types:{
            type:Number,
            default:1
        },
        content: {
            type: String,
            default: 'Not Answered'
        },
        responseTime:{
            type:String
        },
        questionLoadTime: {
            type: String
        },
        loadOptionTime: {
            type: String
        }
    }],
    subAnswers: [{
        content:  {
            type: String
        }
    }]
    
})


module.exports = mongoose.model("Answer", respondentsSchema)