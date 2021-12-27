var express = require('express');
var router = express.Router();
const db = require('../models');
var sqlite3 = require('sqlite3').verbose();
var axios = require('axios');

//The router responsible for extracting the attractions at the request of the user (type and age of the attraction).
router.get('/attraction', (req, res) => {
    if(req.session.att==="museum" &&req.session.attAge==="children"){
    return findAllChildAttraction(req.session.att)
        .then(function (contact){
            res.json([contact,req.session.userName]).then(result=>{
            }).catch((err) => result404(req,res))})
        .catch((err) => result404(req,res));}
    else {
        return findAllAttraction(req.session.att)
            .then(function (contact){
                res.json([contact,req.session.userName]).then(result=>{
                }).catch((err) => result404(req,res))})
            .catch((err) => result404(req,res));}
});


//A function that finds an attraction of a certain type
function findAllAttraction(kindAttraction)
{

    return getKindAttraction(kindAttraction).findAll({
    }).then((contacts) =>
    {return contacts;
    }).catch((err) => result404(req,res));
}
//A function that finds an attraction by age.A function that finds an attraction by age.
function findAllChildAttraction(kindAttraction)
{
   return getKindAttraction(kindAttraction).findAll({
            where: {
                age:"child"
            }
        }).then((contacts) =>
        {return contacts;
        }).catch((err) => result404(req,res));
}
//A function that returns an error to the client when a database access problem occurs
function result404(req,res)
{
    res.status(404).send()
}

//The router is responsible for returning the next 10 attractions to the user.
router.post('/attraction1', (req, res) => {
    let att=[];
    let index=0;
    for (let obj of req.body) {
        getKindAttraction(req.session.att).findOne({
            where: {
                id: obj
            }
        }).then((contacts) =>
        {
            index++;
            att.push(contacts);
            if (index===10)
                return res.json([att,getKindAtt(req.session.att)]);
        }).catch((err) => result404(req,res));
    }
    });
//The router is responsible for calculating the distance of the attractions from the user according to the distance traveled by private car.
router.post('/attraction2', function(req, res, next) {
    let dis = 0;
    if (!(req.session.lng != null&req.session.lat!=null))//Check if the user has already entered a location by a specific address, if we do not want to update the location by the current address.
    {
        req.session.lat=req.body[2];
        req.session.lng=req.body[3];
    }

    var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+req.body[0]+','+req.body[1]+'&destinations=side_of_road:'+req.session.lat+','+req.session.lng+'&key=YOUR_API_KEY&language=he',
        headers: { }
    };
   return  axios(config)
        .then(function (response) {
            res.json(response.data).then(result=>{
            }).catch((err) => result404(req,res));
        })
       .catch((err) => result404(req,res));
});

// Returns an attraction type object
function getKindAttraction(kind)
{
    switch (kind)
    {
        case 'restaurant':
            return db.Restarurant;
        case 'park':
            return db.park;
        case 'museum':
            return db.Museum;
        case 'shopping':
            return db.Shopping_mall;
        case 'zoo':
            return db.Zoo;
        case 'amusement_park':
            return db.Amusement_park;

    }


}
//Function that returns a print depending on the type of current attraction.2
function getKindAtt(kind)
{
    switch (kind)
    {
        case 'restaurant':
            return "מסעדות";
        case 'park':
            return "פארק";
        case 'museum':
            return "מוזאון";
        case 'shopping':
            return "קניונים";
        case 'zoo':
            return "גן חיות";
        default:
            return "מסעדות";

    }


}
module.exports = router;
