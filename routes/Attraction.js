var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
const db = require('../models');

//The url: / attraction handler first checks for the get request if the user has already selected an attraction
// type then moves it to the page to view the attractions otherwise returns to the main page.
router.get('/', function(req, res, next) {
    if(req.session.att!=null)
        res.render('Attraction',{ userName: req.session.userName});
    else
        res.redirect("/");

});
// keeps the type of attraction selected by the user in the session and moves it to the page for viewing the attractions
router.post('/', function(req, res, next) {
    req.session.att=req.body.att;
    res.render('Attraction',{ userName: req.session.userName});


});
//The url handler: / attraction / age first checks for the get request whether the user has already selected
// the age of the attraction and then moves it to a page for filtering by age otherwise returns to the main page.
router.get('/age', function(req, res, next) {
    if(req.session.attAge!=null)
        res.render('AttractionAge',{age:getKindAge(req.session.attAge), userName: req.session.userName});
    else
        res.redirect("/");
});
//The handler that handles when the user selects filter by age,
// keeps the age of the attraction in the screens and moves it to the page for filtering by age.
router.post('/age', function(req, res, next) {
    req.session.attAge=req.body.age;
    res.render('AttractionAge',{age:getKindAge(req.session.attAge), userName: req.session.userName});// שליחה לדף ה-register שוב

});
//router that handles the user's click on the type of attraction on the age filtering page.
router.post('/age/:attraction', function(req, res, next) {
    req.session.att=req.params.attraction;
    res.redirect("/getAttraction/attraction");
});


//A function that checks for what age the attractions are displayed and returns printing according to age.
function getKindAge(kind)
{
    switch (kind)
    {
        case 'children':
            return "לילדים";
        case 'families':
            return "לכל המשפחה ולמבוגרים";

        default:
            return "לכל המשפחה ולמבוגרים";
    }
}
module.exports = router;
