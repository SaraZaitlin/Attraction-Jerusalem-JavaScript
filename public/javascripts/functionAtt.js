let  my=(function (){
    let publicData={};
    let index=0,re,arrId=[],arrPosition=[],myLat=0,myLong=0,myArr=[4];

//A function that brings the reports of a particular attraction from the server by a FETCH request
    let getRevwies=function (id){
        return    fetch("/getRevwies/attraction/"+id, {
            method: 'POST',
            redirect: 'follow'

        })
            .then(myGeneral.my_json.status)
            .then(myGeneral.my_json.json)
            .then(resp => {
                return resp;
            })
            .catch(e => {
                console.log("error send");
            });
    }
    //A function that builds the place rating for the user view
    let starRating=function (rating){
        let star="";

        for (let i=1;i<=rating;i++){
            star+="<i class='fa fa-star ' style='color: #edbc64'></i>";}
        let starEmpty=(5-rating);
        if(!Number.isInteger(starEmpty))
        {
            star+="<i class='fa fa-star-half-o fa-flip-horizontal ' style='color: #edbc64'></i>";

        }
        for (let i=1;i<=starEmpty;i++)
            star+="<i class='fa fa-star-o'style='color: #edbc64'></i>";
        return star;
    };

//Function Responsible for Construction The display of the 10 attractions displayed to the user on the screen
    let showMoreAtt= function() {
        console.log("index:"+index);
        fetch('/getAttraction/attraction1',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([arrId[index],arrId[index+1],arrId[index+2],arrId[index+3],arrId[index+4],arrId[index+5],arrId[index+6],arrId[index+7],arrId[index+8],arrId[index+9],])
        })
            .then(myGeneral.my_json.status)
            .then(myGeneral.my_json.json)
            .then(function (respons) {
                let response=respons[0];
                index+=10;
                let question = " <div class='container-fluid alert p-3 mb-2  text-center text-warning shadow p-3 mb-5 bg-white rounded ' ><h2>"+respons[1] +" </h2></div><div class='row row-cols-1 row-cols-md-2 g-4  p-3 m-2'>";
                let i = 0;
                for (let att of response) {
                    getRevwies(att.id)
                        .then(function (res) {
                            question += " <div class='col p-2'>" + "<div class='card  shadow h-100' >" +
                                "    <div class='row g-0'>" +
                                "    <div class='col col-md-4'>" +
                                "    <img src='/images/image.jpg' class='img-fluid rounded-start' alt='image'></div>" +
                               // "<img src=" + 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + 180 + '&maxheight=' + 140 + '&photoreference=' + att.photo_reference + '&key=API_KEY' +"></div>"+
                                "    <div class='col col-md-8'>" +
                                "    <div class='row h-100'><div class='col col-md-8>'" +
                                "    <div class='card-body'>" +
                                "    <h5 class='card-title'>" + att.name + "</h5>" +
                                "    <p class='card-text'>" + att.vicinity + "</p>";
                            if (res.length) {
                                question += " <div> <button class='navbar-toggler' type='button' data-toggle='collapse'" +
                                    "       data-target='" + "#navbarToggleExternalContent" + att.id + "'" +
                                    "  aria-controls='navbarToggleExternalContent' aria-expanded='false' aria-label='Toggle navigation'>חוות דעת " +
                                    "  </button></div>";
                            }
                            question+="<button type='button' pid-data='"+att.id+"'  id='load'>דווח על עומסים</button>";
                            if (att.load!=null)
                                question+="    <p class='card-text'>" +"עומס המקום "+ att.load + "</p>";

                            question += "   </div> <div class='col col-md-4  bg-light '><div ><p>דירוג המקום: </p><span>" + att.rating + "  " + "</span>";
                            let rating=starRating(att.rating);
                            question+=rating+"</div>";
                            if(respons[1]!="פארק")
                                question += "<div><p><span><i class='fa fa-phone ' style='font-size:24px; color: #edbc64;'> </i></span> " + att.phone_number + "</p></div>" ;
                            question+=  "<div><span><i style='font-size:24px; color: #edbc64;' class='fa'>&#xf041;</i></span><a href='" + att.url + "' class='text-dark ' target='_blank'>  מפות </a></div>" +
                                "</div>" +
                                "  </div></div></div>";
                            if (res.length) {
                                question += "<div class='collapse' id='" + "navbarToggleExternalContent" + att.id + "'>" +
                                    "<div class='bg-whith p-4 shadow'><div class='row'>" ;
                                question+=    "<div class='col-6 col-md-4'><button class='navbar-toggler' type='button' data-toggle='collapse'" +
                                    "       data-target='" + "#navbarToggleExternalContent" + att.id + "'" +
                                    "  aria-controls='navbarToggleExternalContent' aria-expanded='false' aria-label='Toggle navigation'>" +
                                    " <span><i class='fa fa-arrow-right' style='font-size:24px'></i></span></button></div>" +
                                    "<div class='col-6 col-md-6'><h4>כל הביקורות</h4></div></div>";
                                for (let revwies of res){
                                    let rat=starRating(revwies.rating);

                                    question+="<div><p class='font-weight-bold'>"+revwies.author_name+"</p><div>"+
                                        rat+ "<span>"+revwies.time+"</span></div>"+
                                        "<div><p>"+revwies.text+"</p></div></div>";
                                }
                                question+="</div></div>";

                            }
                            question += "</div></div>";
                            i++;
                            document.getElementById("result").innerHTML = question+"</div>";
                            document.querySelectorAll("#load").forEach(button=>button.addEventListener("click", function (e) {
                                my.reportLoad(e.target.getAttribute("pid-data"));
                            }));
                        });

                }
            }).catch(function (error) {
        });

    }
    //A function is responsible for checking whether a user is logged in or not and not displaying a message (when a user wants to report)
    publicData.reportLoad=function (id)
    {
        if(sessionStorage.getItem('connect'))
            window.location.assign("/load/idAtt/"+id);
        else
            alert("Sorry, you are not logged in and therefore can not report");
    }


    //A function that sorts the attractions according to the proximity of the user
    function bubbleSortArr()
    {
        for(let i = 0; i < arrPosition.length; i++){
            for(let j = 0; j < ( arrPosition.length - i -1 ); j++){
                if(arrPosition[j] > arrPosition[j+1]){
                    var temp = arrPosition[j];
                    arrPosition[j] = arrPosition[j + 1];
                    arrPosition[j+1] = temp;

                    var temp1 = arrId[j];
                    arrId[j] = arrId[j + 1];
                    arrId[j+1] = temp1;
                }
            }
        }


    }


        //A function that calculates the distance of the attractions from the user
    publicData.calculateAttractionNearUser= function (response) {
        index=0;
        for (let i = 0; i < response.length; i++) {
            arrId[i] = response[i].id;
            myArr[0] = (response[i].lat);
            myArr[1] = (response[i].lng);
            myArr[2]=sessionStorage.getItem('latitude');
            myArr[3]=sessionStorage.getItem('longitude');

            fetch('/getAttraction/attraction2',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(myArr)
                })
                .then(myGeneral.my_json.status)
                .then(myGeneral.my_json.json)
                .then(function (res) {
                    arrPosition[i] =  res.rows[0].elements[0].duration.value;
                    bubbleSortArr();
                    let end=(response.length-1);
                    if (i===end)
                    {
                        showMoreAtt();
                        myGeneral.myElement.hideAndDisplaysElement("pulley");
                        myGeneral.myElement.hideAndDisplaysElement("moreAtt");
                    }
                }).catch(function (error) {
                console.log("er");
            });
        }
    }
    //A function that brings up the following attractions
    publicData.showMore=function (){

        showMoreAtt();
    }
    return publicData;
})();

