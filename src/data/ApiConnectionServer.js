
export class ApiConnectionServer{

    //urlServer = "https://apishopdocker.azurewebsites.net/api/";
    urlServer = "http://localhost:80/api/";

    postData(bodyData,endpoint){
        var requestData = JSON.stringify(bodyData);

        var peticion = fetch(this.urlServer + endpoint,
        {
            method:'POST',
            headers:{
                'Accept':'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body:requestData
        })

        return peticion;
    }

    postDataAuth(bodyData,endpoint,token){
        var requestData = JSON.stringify(bodyData);
        console.log(token);
        var peticion = fetch(this.urlServer + endpoint,
        {
            method:'POST',
            headers:{
                'x-access-token': token, 
                'Accept':'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body:requestData
        })

        return peticion;
    }


    getData(endpoint){
        var peticion = fetch(this.urlServer + endpoint);
        return peticion;
    }

}