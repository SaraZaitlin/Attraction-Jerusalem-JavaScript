let geocoder;
function initMap() {
    geocoder = new google.maps.Geocoder();
}
let  myGeocode=(function (){
    let publicData={};
//A function that gets a location name and translates it to a location in coordinates
    function geocode(request) {
        console.log("start-go1")
        geocoder
            .geocode(request)
            .then((result) => {


                let lat=JSON.parse(JSON.stringify(result, null, 2)).results[0].geometry.location.lat;
                let lng=JSON.parse(JSON.stringify(result, null, 2)).results[0].geometry.location.lng;

                fetch('/location/'+ lat+"/"+lng, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(myGeneral.my_json.status)
                    .then(myGeneral.my_json.json)
                    .then(resp => {
                        console.log("sucsses send");
                    })
                    .catch(e => {
                        console.log("error send");

                    });
                document.getElementById("sucsses").innerHTML="<p>עודכן בהצלחה</p>"
            })
            .catch((e) => {
                alert("Geocode was not successful for the following reason: " + e);
            });
    }
    //A public function that gets a name of a location and sends it to the function responsible for putting the place to sleep in coordinates
    publicData.geo= function (){
        console.log("start-go")
        var address = document.getElementById("address").value;
        console.log("ad"+address)
        geocode({"address":address});
    }
    return publicData;
})();
