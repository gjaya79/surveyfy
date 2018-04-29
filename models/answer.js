var mongoose = require("mongoose")


// Getting ObjectId data

var respondentsSchema = mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    lastName: String,
    questionnaire: {
        type: respondentsSchema.Types.ObjectId,
        ref: 'Questionnaire'
    },
    content: String, 
    
})


module.exports = mongoose.model("Answer", respondentsSchema)