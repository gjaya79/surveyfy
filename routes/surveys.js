var express = require("express")
var router  = express.Router()
var Survey  = require("../models/survey")
var middleware = require("../middleware/index") // "../middleware" is fine coz of index.js has a special value for node 

// Display - Route for Surveys
router.get("/", middleware.isLoggedIn,function(req, res) {
    var noMatch = null;
    // To display the Survey searched by the user
    if (req.query.search) {
        // Get all survey from search string
        const regex = new RegExp(escapeRegex(req.query.search), 'gi'); // g - global, i - ignore case
        Survey.find({name: regex}, function(error, allSurveys) {
            if (error) {
                console.log(error)
            } else {
                
                 if(allSurveys.length < 1) {
                  noMatch = "No campgrounds match that query, please try again.";
                  
              }
                res.render("surveys/index", {surveys: allSurveys, noMatch: noMatch})
            }
        })
    } else {
        // Get all surveys from database
        Survey.find({}, function(error, allSurveys) {
            if (error) {
                console.log(error)
            } else {
                res.render("surveys/index", {surveys: allSurveys})
            }
        })
    }
})

// Create - Route for Creating Surveys
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name
    var description = req.body.description
    var startdate = req.body.startdate
    var enddate = req.body.enddate
    var author = {
        id: req.user._id,
        username: req.user.username,
        firstName: req.user.firstName
    }
    
    var topic = req.body.topic
    
    // Check to ensure if the survey added to featured surveys
    let featuredSurveys;
    if (req.body.featuredSurveys) {
        featuredSurveys = true
    } else {
        featuredSurveys = false
    }
    
    // Check to ensure if the survey added as a public survey
    let publicSurvey;
    if (req.body.publicSurvey) {
        publicSurvey = true
    } else {
        publicSurvey = false
    }
    
    // Check to ensure if the respondents should see UI elements or not
    let hideRespondentsNav;
    if (req.body.hideRespondentsNav) {
        hideRespondentsNav = true
    } else {
        hideRespondentsNav = false
    }
    
    var newSurvey = {name: name, description: description, startdate, enddate, author: author, topic: topic, featuredSurveys: featuredSurveys, publicSurvey: publicSurvey, hideRespondentsNav: hideRespondentsNav}
    
    
    
    // newSurvey.author.id = req.user._id
    // newSurvey.author.username = req.user.username
    // newSurvey.author.firstName = req.user.firstName
    
    
    
    // Create a new survey and save
    Survey.create(newSurvey, function(error, newSurveyCreated) {
        if (error) {
            console.log(error)
        } else {
            // redirecting to surveys
            console.log(newSurveyCreated)
            res.redirect("/surveys")
        }
    })
    
})

// Survey Form - Route for Survey form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("surveys/new")
})

// Survey Form - Route for Survey report
router.get("/report", middleware.isLoggedIn, function(req, res) {
    Survey.find({}, function(error, allSurveys) {
        if (error) {
            console.log(error)
        } else {
            res.render("surveys/report", {surveys: allSurveys})
        }
    })
})

// Show Survey - Route for displaying an individual Survey
router.get("/:id", middleware.isLoggedIn, function(req, res) {
    Survey.findById(req.params.id).populate("questions").exec( function(error, foundSurvey) {
        if (error) {
            console.log(error)
        } else {
            res.render("surveys/show", {survey: foundSurvey, routeParam: req.params})
        }
    })
    
})

// Respondent Survey Display - Route for displaying an individual Survey
router.get("/response/:id", function(req, res) {
    
    Survey.findById(req.params.id).populate("questions").exec( function(error, foundSurvey) {
        if (error) {
            console.log(error)
        } else {
            res.render("respondents/respondent_answer", {survey: foundSurvey})
        }
    })
})

// EDIT - Survey Edit Route
router.get("/:id/edit", middleware.checkSurveyOwnership, function(req, res) {

    Survey.findById(req.params.id, function(err, foundSurvey) {
        res.render("surveys/edit", {survey: foundSurvey})
    })
})

// UPDATE - Survey Update Route
router.put("/:id", middleware.checkSurveyOwnership, function(req, res) {
    
    var name = req.body.name
    var description = req.body.description
    var startdate = req.body.startdate
    var enddate = req.body.enddate
    var author = {
        id: req.user._id,
        username: req.user.username,
        firstName: req.user.firstName
    }
    
    var topic = req.body.topic
    
    // Check to ensure if the survey added to featured surveys
    let featuredSurveys;
    if (req.body.featuredSurveys) {
        featuredSurveys = true
    } else {
        featuredSurveys = false
    }
    
    // Check to ensure if the survey added as a public survey
    let publicSurvey;
    if (req.body.publicSurvey) {
        publicSurvey = true
    } else {
        publicSurvey = false
    }
    
    // Check to ensure if the respondents should see UI elements or not
    let hideRespondentsNav;
    if (req.body.hideRespondentsNav) {
        hideRespondentsNav = true
    } else {
        hideRespondentsNav = false
    }
    
    var editedSurvey = {name: name, description: description, startdate, enddate, author: author, topic: topic, featuredSurveys: featuredSurveys, publicSurvey: publicSurvey, hideRespondentsNav: hideRespondentsNav}
    
    console.log("before:")
    console.log(editedSurvey)
    
    
    // find and update survey
    Survey.findByIdAndUpdate(req.params.id, editedSurvey, function(err, updatedSurvey){
        if(err) {
            
            res.redirect("/surveys");
        } else {
            res.redirect("/surveys/" + req.params.id); // we can use updatedSurvey._id
        }
    })
})

// DELETE - Survye Delete Route
router.delete("/:id", middleware.checkSurveyOwnership, function(req, res) {
    Survey.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err)
            res.redirect("/surveys")
        } else {
            res.redirect("/surveys")
        }
    })
})

function escapeRegex(text) {
    // Matches any number of characters globally
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router