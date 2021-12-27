var express = require('express');
var router = express.Router();
const db = require('../models');
var sqlite3 = require('sqlite3').verbose();
var axios = require('axios');

//router that handles the creation of a new attraction to the database.
router.post('/build/:attraction', function(req, res, next) {
    let kindAttraction=getKindAttraction(req.params.attraction);
    let kindRev=kindReviews(req.params.attraction);
    deleteDataBase(kindRev).then(r =>{
    for (let obj of req.body)
    {
        kindAttraction.findOne({//Check if the attraction already exists
            where: {
                name:obj.name,
                vicinity:obj.vicinity
            }
        }).then(att => {
                    addParamOnAtt(obj.place_id.trim())
                        .then(addParam => {
                            if (att === null) {//If it does not exist we will create the attraction in the database.
                                buildPlace(kindAttraction,addParam.result,obj)
                                .then((contacts) => {
                                    console.log("start build Reviews");
                                    if(addParam.result.hasOwnProperty("reviews")){//Check if there are reports from users of the attraction..
                                        for (let reviews of addParam.result.reviews ) {
                                            buildPlaceReviews(contacts.id, reviews, req.params.attraction)
                                                .then((result) => {
                                                }).catch((err) => result404(req,res));
                                        }
                                    }
                                }).catch((err) => result404(req,res));
                                }
                            else {//If the attraction already exists we would just like to update the reports.
                                if(addParam.result.hasOwnProperty("reviews")){
                                    for (let reviews of addParam.result.reviews ) {
                                        buildPlaceReviews(att.id, reviews, req.params.attraction)
                                            .then((result) => {
                                            }).catch((err) => result404(req,res));
                                    }
                                }
                            }
                       }).catch((err) => result404(req,res));

            }).catch((err) => result404(req,res));
    }
    } )
        .catch((err) => result404(req,res));
});
//A function is responsible for creating the new attraction to the database.
function buildPlace(kindAttraction,addParam,obj){
    let formatted_phone_number="חסר טלפון"
    if(addParam.hasOwnProperty('formatted_phone_number'))
    {formatted_phone_number=addParam.formatted_phone_number;}
    return kindAttraction.create({
        name:obj.name,
        lat:obj.location.lat,
        lng:obj.location.lng,
        photo_reference:
        obj.photos.photo_reference,
        html_attributions:obj.photos.html_attributions,
        height:obj.photos.height,
        width:obj.photos.width,
        rating:obj.rating,
        vicinity:obj.vicinity,
        place_id:obj.place_id,
        url:addParam.url,
        phone_number:formatted_phone_number
    }).then((contacts) =>
      {return contacts;
      }).catch((err) => result404(req,res));
}
//Function is responsible for creating reports on the attraction to the database.
function buildPlaceReviews(id_place,reviews,kind){
    let kindReviewsATT=kindReviews(kind)
    return kindReviewsATT.create({
        id_place:id_place,
        author_name:reviews.author_name,
        rating:reviews.rating,
        time:reviews.relative_time_description,
        text:reviews.text
    }).then((contacts) =>
    {console.log("r2-saccses");
        return contacts;
    }).catch((err) => result404(req,res));
}
//A function that checks whether the attraction already exists in the database.
function findAtt(kindAttraction,obj)
{
   return kindAttraction.findOne({
        where: {
            name:obj.name,
            vicinity:obj.vicinity
        }
    }).then((contacts) =>
    {return contacts;
    }).catch((err) => result404(req,res));
}
//Function responsible for extracting more details about the attraction like phone, URL ....
function addParamOnAtt(place_id)
{
    var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id='+place_id+'&fields=name,reviews,url,formatted_phone_number&language=he&key=YOUR_API_KEY',
        headers: { }
    };
   return  axios(config)
        .then(function (response) {
            console.log("ParamOnAtt: "+JSON.stringify(response.data));
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        })
};
//Function responsible for deleting the database.
async function deleteDataBase(kindAttraction) {
    await kindAttraction.destroy({
        truncate: true
    });
}
//A function that returns an error to the client when a database access problem occurs
function result404(req,res)
{
    res.status(404).send()
}
//Returns an attraction-type object
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

