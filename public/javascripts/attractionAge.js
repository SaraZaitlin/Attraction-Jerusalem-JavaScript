let  myAttAge=(function (){
    let publicData={};
//Function that brings the attractions from the server (according to the type and age of the attraction requested by the user) by FETCH request
    publicData.getAttraction=function(kindAttraction)
    {
        myGeneral.myElement.hideAndDisplaysElement("pulley");

            fetch('/attraction/age/' + kindAttraction,
                {

                    method: 'POST',
                    redirect: 'follow'
                })
                .then(myGeneral.my_json.status)
                .then(myGeneral.my_json.json)
                .then(function (response) {
                    if(response[1]!=null&&response[1]!=" ")
                    {
                        console.log("connect");
                        sessionStorage.setItem('connect', 'connect');
                    }

                    my.calculateAttractionNearUser(response[0]);

                }).catch(function (error) {
            });
    }

    return publicData;

})();

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("location").addEventListener("click", myGeocode.geo);
    document.querySelectorAll("#attGil").forEach(button=>button.addEventListener("click", function (e) {

        myAttAge.getAttraction(e.target.getAttribute("pid-data"));
    }));
document.getElementById("moreAtt").addEventListener("click",my.showMore);
}, false);
