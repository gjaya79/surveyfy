/*
Author: Avinash Reddy
Edited:Yuxuan He
Date: 07/05/2018
*/


var mongoose = require("mongoose")

var respondentsSchema = mongoose.Schema({
    survey:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey'
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
            type: String
        }
    }]
    
})


module.exports = mongoose.model("Answer", respondentsSchema)