let  myAtt=(function (){
    let publicData={};
//Function that brings the attractions from the server (according to the type of attraction the user requested) by requesting FETCH
     publicData.getAttraction=function()
     {
         myGeneral.myElement.hideAndDisplaysElement("pulley");
        fetch('/getAttraction/attraction',
            {

                method: 'GET',
                redirect: 'follow'
            })
            .then(myGeneral.my_json.status)
            .then(myGeneral.my_json.json)
            .then(function (response) {
                if(response[1]!=null&&response[1]!=" ")
                    sessionStorage.setItem('connect', 'connect');
                my.calculateAttractionNearUser(response[0]);
            }).catch(function (error) {});
    }
    return publicData;
})();
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("location").addEventListener("click", myGeocode.geo);

    myAtt.getAttraction();
    document.getElementById("moreAtt").addEventListener("click",my.showMore);

}, false);
