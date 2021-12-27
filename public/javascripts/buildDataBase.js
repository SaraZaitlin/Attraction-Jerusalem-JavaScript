let myBuild=(function(){
    let publicData={};
    let my_json=function (){
        //Function responsible for getting the status of what we got from the site


        //Function responsible for submitting a weather forecast request and managing the return value we received
        function  getAttFormUrl(url,urlBuild){
            console.log(url);

            fetch(url)
                .then(myGeneral.my_json.status)
                .then(myGeneral.my_json.json)
                .then(function(response) {
                    let arrJson=[];
                    for(let resp of response.results) {
                        if (resp.hasOwnProperty("vicinity")&&resp.hasOwnProperty("name")&&
                            resp.hasOwnProperty("geometry")) {
                            let price_level = "0";
                            let rating = "0";
                            let html_attributions = [];
                            let photo_reference = "0";
                            let height = "0";
                            let width = "0";
                            if (resp.hasOwnProperty('photos')) {
                                html_attributions = resp.photos[0].html_attributions;
                                photo_reference = resp.photos[0].photo_reference;
                                height = resp.photos[0].height;
                                width = resp.photos[0].width;
                            }
                            if (resp.hasOwnProperty("rating"))
                                rating = resp.rating;
                            let obj = {
                                "location": {
                                    "lat": resp.geometry.location.lat,
                                    "lng": resp.geometry.location.lng
                                },
                                "name": resp.name,
                                "photos": {
                                    "html_attributions": html_attributions,
                                    "photo_reference": photo_reference,
                                    "height": height,
                                    "width": width
                                },
                                "rating": rating,
                                "vicinity": resp.vicinity,
                                "place_id":resp.place_id
                            };
                            arrJson.push(obj);
                        }
                    }
                    console.log(arrJson);

                    sendJsonRouter(arrJson,urlBuild)
                    // let json=parser.toJSON(arrJson);

                }).catch(function(error) {
                console.log("catch-getAttFormUrl");
            });
        };
//A function that sends JSON to a server that includes the information about new attractions.
        let sendJsonRouter=function (arrJson,url){
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(arrJson)
            })
                .then(myGeneral.my_json.status)
                .then(myGeneral.my_json.json)
                .then(resp => {
                    console.log("sucsses send");
                })
                .catch(e => {
                    console.log("error send");
                });

        };


        return{
            getAttFormUrl:getAttFormUrl
        }

    }();
    //A primary function that calls the functions to update each of the database
    let updateDataBase=function (){
        console.log("p");
        for (let i=1;i<=2;i++)
            my_json.getAttFormUrl("/json/amusement_park/amusement_park"+i+".json","/buildDataBase/build/amusement_park");

        for (let i=1;i<=7;i++)
            my_json.getAttFormUrl("/json/shopping_mall/shopping_mall"+i+".json","/buildDataBase/build/shopping");

        for (let i=1;i<=14;i++)
          for (let i=5;i<=14;i++)
            my_json.getAttFormUrl("/json/restaurant/restaurants"+i+".json","/buildDataBase/build/restaurant");
        //
        for (let i=1;i<=13;i++)
        for (let i=5;i<=13;i++)
           my_json.getAttFormUrl("/json/park/park"+i+".json","/buildDataBase/build/park");
         for (let i=2;i<=8;i++)
        my_json.getAttFormUrl("/json/museum/museum"+i+".json","/buildMuseums/build/museum");

        my_json.getAttFormUrl("/json/zoo1.json","/buildDataBase/build/zoo");

    }

//A function that checks if a month has passed since the last database update
    let getMonthsPassed=function (){
        console.log("getMonthsPassed")

        const startDate = new Date(2021, 9, 1); // month start at 0
        const currentDate = new Date();
        const monthDifference =
            (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
            (currentDate.getMonth() - startDate.getMonth());
        console.log(currentDate.getFullYear() +", " +startDate.getFullYear()+"= "+monthDifference)
        return monthDifference;
    };
//A primary function that checks if a month has passed since the database update and if so, calls the function that updates.
    publicData.updateWeb=function (){
        let now = new Date();
        if(getMonthsPassed()>=0)
        {
            if(now.getDate()===1)
                updateDataBase();
        }
        let night = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1, // the next day, ...
            0, 0, 0 // ...at 00:00:00 hours
        );
        var msTillMidnight = night.getTime() - now.getTime();
        setTimeout(myBuild.updateWeb, msTillMidnight);
    };
    return publicData;
})();
