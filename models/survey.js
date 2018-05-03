var mongoose = require("mongoose")

// Setting a Schema and Model
var surveySchema = new mongoose.Schema({
    name: String,
    description: String,
    createdAt: {type: Date, default: Date.now},
    startdate: String,
    enddate: String,
    featuredSurveys: {
        type: Boolean,
        default: false
    },
    publicSurvey: {
        type: Boolean,
        default: false
    },
    hideRespondentsNav: {
        type: Boolean,
        default: false
    },
    topic: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String,
        firstName: String
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }]
})

module.exports = mongoose.model("Survey", surveySchema)