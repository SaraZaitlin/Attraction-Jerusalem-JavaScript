var express = require('express');
var router = express.Router();
const db = require('../models');
var sqlite3 = require('sqlite3').verbose();

//router that extracts the details thanks to user reports on the attraction by the attraction's id.
router.post('/attraction/:id', (req, res) => {
        return findAllRevwies(req.session.att,req.params.id)
            .then(function (contact){
                res.json(contact).then(result=>{
                }).catch((err) => result404(req,res))})
            .catch((err) => result404(req,res));

});

//A function that extracts the details thanks to user reports on the attraction.
function findAllRevwies(kindAttraction,id)
{
    return kindReviews(kindAttraction).findAll({
        where: {
            id_place:id
        }
    }).then((contacts) =>
    {return contacts;
    }).catch((err) => result404(req,res));
}
// A function that returns an error to the client when a database access problem occurs
function result404(req,res)
{
    res.status(404).send()
}
//Returns a table-type object of reporting users on attractions

function kindReviews(kind)
{
    switch (kind)
    {
        case 'restaurant':
            return db.RestarurantPlaceReview;
        case 'park':
            return db.parkPlaceReview;
        case 'museum':
            return db.MuseumPlaceReview;
        case 'shopping':
            return db.Shopping_mallPlaceReview;
        case 'zoo':
            return db.ZooPlaceReview;
        case 'amusement_park':
            return db.Amusement_parkPlaceReview;


    }


}
module.exports = router;
