var express = require('express');
var router = express.Router();
const db = require('../models');
const got = require("got");
const axios = require("axios");
var sqlite3 = require('sqlite3').verbose();

//router that handles the creation of a new attraction to the database.
router.post('/build/:attraction', function(req, res, next) {
    deleteDataBase()
        .then(r =>{
            for (let obj of req.body) {
                db.Museum.findOne({//Check if the attraction already exists
                    where: {
                        name: obj.name,
                        vicinity: obj.vicinity
                    }
                }).then(att => {
                    addParamOnAtt(obj.place_id.trim())
                        .then(addParam => {
                            if (att === null) {//If it does not exist we will create the attraction in the database.

                                addParamOnAtt(obj.place_id)
                                    .then(addParam => {
                                        buildPlace(addParam.result, obj)
                                            .then((contacts) => {
                                                if (addParam.result.hasOwnProperty("reviews")) {//Check if there are reports from users of the attraction..
                                                    for (let reviews of addParam.result.reviews) {
                                                        buildPlaceReviews(contacts.id, reviews)
                                                            .then((contacts) => {
                                                            });}}});});
                            }
                            else {//If the attraction already exists we would just like to update the reports.
                                if (addParam.result.hasOwnProperty("reviews")) {
                                    for (let reviews of addParam.result.reviews) {
                                        buildPlaceReviews(att.id, reviews, req.params.attraction)
                                            .then((result) => {
                                            }).catch((err) => result404(req, res));
                                    }}}});});}
    }).catch((err) => result404(req,res));
});
//A function is responsible for creating the new attraction to the database.
function buildPlace(addParam,obj){
    let formatted_phone_number="חסר טלפון"
    if(addParam.hasOwnProperty('formatted_phone_number'))
    {
        formatted_phone_number=addParam.formatted_phone_number;}
   return  CheckForWhatAgeOfAtt(addParam.url)
       .then((contacts) =>{
            return db.Museum.create({
                name:obj.name,
                lat:obj.location.lat,
                lng:obj.location.lng,
                photo_reference:
                obj.photos.photo_reference,
                html_attributions:contacts,
                height:obj.photos.height,
                width:obj.photos.width,
                rating:obj.rating,
                vicinity:obj.vicinity,
                place_id:obj.place_id,
                url:addParam.url,
                phone_number:formatted_phone_number,
                age:contacts
            }).then((contacts) =>
            {return contacts;}).catch((err) => result404(req,res));
        }).catch((err) => result404(req,res));

}
////Function is responsible for creating reports on the attraction to the database.
function buildPlaceReviews(id_place,reviews){
    return db.MuseumPlaceReview.create({
        id_place:id_place,
        author_name:reviews.author_name,
        rating:reviews.rating,
        time:reviews.relative_time_description,
        text:reviews.text
    }).then((contacts) =>
    {return contacts;}).catch((err) => result404(req,res));
}

function addParamOnAtt(place_id)
{
    console.log("addParamOnAtt");
    var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id='+place_id+'&fields=name,reviews,url,formatted_phone_number&key=YOUR_API_KEY&language=he',
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
////Function responsible for deleting the database.
async function deleteDataBase() {
    await Museum.destroy({
        truncate: true
    });
}
//A function that returns an error to the client when a database access problem occurs

function result404(req,res)
{
    res.status(404).send()
}
//A function responsible for checking at what age the attraction is suitable.
function CheckForWhatAgeOfAtt(url){
   return  got(url)
        .then(response => {
            if (response.body.includes("מתאים לילדים"))
            {return "child";}
            return "not-child";
        })
        .catch(err => {
            return Promise.reject(
                err.response && err.response.body ? err.response.body : err
            );
        })
};

module.exports = router;

