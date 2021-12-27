let  myGeneral=(function (){
    let publicData={};

    publicData.myElement=function ()
    {
        //A general function used to show and hide elements
        let hideAndDisplaysElement=function(id) {document.getElementById(id).classList.toggle('d-none');};
        return{
            hideAndDisplaysElement:hideAndDisplaysElement
        }
    }();

    publicData.my_json=function (){
        //Function responsible for getting the status of what we got from the site

        function status(response) {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        }
//----------------------------------------------------------
        //A general function responsible for extracting the resulting JSON
        function json(response) {
            return response.json()
        }
        return{
            json:json,
            status:status
        }
    }();
    return publicData;
})();
