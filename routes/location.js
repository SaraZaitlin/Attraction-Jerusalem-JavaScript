var express = require('express');
var router = express.Router();
const db = require('../models');


//router responsible for receiving the user's location and saving it in a session
router.post('/:lat/:lng', function(req, res, next) {
  req.session.lat=req.params.lat;
  req.session.lng=req.params.lng;
  res.status(200).send();

});






module.exports = router;
