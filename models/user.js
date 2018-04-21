var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String, 
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// all methods or functionalities will be provided to user model to get the security
userSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model("User", userSchema)