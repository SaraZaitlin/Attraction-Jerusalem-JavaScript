var express = require('express');
var router = express.Router();

//The router is responsible for handling the landing page.
router.get('/', function(req, res, next) {
    if (req.session.att!=null)
    {
        if(req.session.attAge!=null)
            res.redirect("http://localhost:3000/attraction/age");
        else
        res.redirect("http://localhost:3000/attraction");
    }
    else
        res.render('LandingPage',{ userName: req.session.userName});
});
//The router is responsible for handling the landing page.
router.post('/', function(req, res, next) {
    if (req.session.att!=null)
    {
        if(req.session.attAge!=null)
            res.redirect('/attraction/age')
        else
            res.redirect('/attraction')
    }
    else
        res.render('LandingPage',{ userName: req.session.userName});


});
//router is responsible for handling the push of a button back to main page.
router.post('/BackLandingPage', function(req, res, next) {
    req.session.att=null;
    req.session.attAge=null;
  res.redirect("/");

});




module.exports = router;
