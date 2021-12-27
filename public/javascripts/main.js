
let  my=(function (){
    let publicData={};
    //A function that extracts the user's location so that we can show him the attractions nearby
    publicData.updetLocation=function (){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);

        }}
    //A function that extracts and saves the user's location.
    let showPosition=function (position) {
        sessionStorage.setItem('latitude',position.coords.latitude);
        sessionStorage.setItem('longitude',position.coords.longitude);
    }
    //Displays and hides filtering functions
    publicData.hideButtonType=function (){myGeneral.myElement.hideAndDisplaysElement("listType");};
    publicData.hideButtonAge=function (){myGeneral.myElement.hideAndDisplaysElement("listAge");}

    return publicData;
})();

document.addEventListener('DOMContentLoaded', function(){
    my.updetLocation();
    setTimeout(myBuild.updateWeb, 10000);

    document.getElementById("location").addEventListener("click", myGeocode.geo);
    document.getElementById("type").addEventListener("click",my.hideButtonType);
    document.getElementById("age").addEventListener("click",my.hideButtonAge);

}, false);
