var express = require('express');
var router = express.Router();
const db = require('../models');
var sqlite3 = require('sqlite3').verbose();
var axios = require('axios');
//The router is responsible for forwarding to the attraction report page only if the user is logged in.
router.get('/idAtt/:idAtt', (req, res) => {
    if(req.session.userName!=null&&!isNaN(req.params.idAtt))
    {
        req.session.idAttraction=req.params.idAtt;
        res.render('Load',{ userName: req.session.userName});
    }
    else
        res.redirect('/');
});
//The router is responsible for checking the report (if the user has not reported twice) and handling the report and entering it in the table.
router.post('/', (req, res) => {
    console.log(req.body.stars);
    let l=1;
    getKindAttraction(req.session.att).findOne({
        where: {
            id: req.session.idAttraction
        }
    }).then((contacts) => {
        // let loadNum=req.body.stars;
        // console.log("load:"+loadNum)
        // let arr=[];
        // if (contacts.load!=null)
        // {
        //     for (let user of contacts.load[1])
        //         if( user===req.session.idUser)
        //             res.redirect('/');
        //     let l=contacts.load[0];
        //     console.log(contacts.load[0]+contacts.load[1])
        //     loadNum=(parseInt(loadNum)+parseInt(l))/2;
        //     arr=contacts.load[1]
        // }
        //
        // arr.push(req.session.idUser);
        // let load="["+loadNum+","+arr+"] ";
        // console.log("load"+load);

        let load=req.body.stars;
        console.log("load:"+load)
        if (contacts.load!=null)
        {
            console.log("not-null")
            load=(parseInt(load)+parseInt(contacts.load))/2;

        }
        if (load>5)
            load=5;

    getKindAttraction(req.session.att).update({ load:load}, {
        where: {
            id: req.session.idAttraction
        }
    });
    });
    res.redirect('/');
});
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

module.exports = router;
