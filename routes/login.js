var express = require('express');
var router = express.Router();
const db = require('../models');
var sqlite3 = require('sqlite3').verbose();

//Router for handling url request for login page
router.get('/', function(req, res, next) {

    res.render('login',{result: " "});
});
//The router responsible for connecting an existing user on the login page.
router.post('/', function(req, res, next) {

    let mail = req.body.email.trim();
    let password=req.body.password.trim();

        db.User.findOne({//Check if the user already exists according to the email
            where: {
                email: mail,
                password:password
            }

        }).then((contact) => {
            if (contact === null)//If the user already exists
            {
                res.render('login', {result: "Sorry, this user is not exist"});
            }
                req.session.userName=contact.name
            req.session.idUser=contact.id
            res.redirect("http://localhost:3000/")
        }).catch((err) => res.render('login', {result: "Sorry, this user is not exist"}));// שליחה לדף ה-register שוב


});
//router to handle the user's url request to the registry page.
router.get('/register', function(req, res, next) {

    res.render('register', {result: ""});
});
//router responsible for registering a new user.
router.post('/register', function(req, res, next) {
    let mail = req.body.email.trim();
    let userName=req.body.userName.trim();
    let result="";
    if(!isNaN(userName))//If the first name tells
        result+="Sorry, the user name is num";

    if (result==="") {
        db.User.findOne({//Check if the user already exists according to the email
            where: {
                email: mail
            }

        }).then((contact) => {
            if (contact != null)//If the user already exists
                res.render('register', {result: "Sorry, this user already exists"});// Submit to the register page again
            req.session.mail = mail;
            req.session.userName =userName ;
            res.cookie('timer', '60-sec', {expires: new Date(Date.now() + 60000)})//Start of the 60 second session

            res.render('password', {result: " "});
        }).catch((err) => res.render('register', {result: "Sorry, this user already exists"}));// Submit to the register page again
    }
    else
        res.render('register',{result: result});// Submit to the register page again
});
//router to handle the user's url request to the registry page.
router.get('/password', function(req, res, next) {
if(req.session.mail!=null&&req.session.userName!=null)
    res.render('password');
else
    res.render('register',{result: "the email or the user name is empty"});// Submit to the register page again

});
//Router responsible for continuing the registration process - entering a password within 60 seconds.
router.post('/password', function(req, res, next) {
   console.log("password")


    let password1=req.body.password1.trim();
    let password2=req.body.password2.trim();
    console.log("password:" +req.body.password1+req.body.password2)

    if(req.cookies.timer)//If less than a minute has passed since the start of the registration process
    {
        console.log("password-timer:" +req.body.password1+req.body.password2)

        if(password1===password2) {//If the two passwords (entered by the user) are the same
            db.User.create({//Create the new user in the database
                name:req.session.userName,
                email:req.session.mail,
                password:password1
            }).then((contact)=>{req.userName=" ";
                res.redirect('/login')})//Submit to login page
                .catch((err) => res.render('register', {result:'***There was an error creating a contact'}));//Submit to the register page
        }
        else//If the two passwords (entered by the user) are not the same
            res.render('password', {result: "Sorry, the password didn't same"});// Send to password page again
    }
    else//If a minute has passed since the beginning of the registration process.
        res.render('register', {result:"Has not been connected for more than a minute"});
});

module.exports = router;
