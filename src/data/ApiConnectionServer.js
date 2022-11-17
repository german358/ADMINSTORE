
export class ApiConnectionServer{

    //urlServer = "https://apishopv12.azurewebsites.net/api/";
    //urlServer = "http://localhost:80/api/";
    urlServer = "https://apishopv12.herokuapp.com/api/";


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


    getDataToken(endpoint,token){
        var peticion = fetch(this.urlServer + endpoint,
        {
            method:'GET',
            headers:{
                'x-access-token': token, 
                'Accept':'application/json, text/plain, */*',
                'Content-Type':'application/json'
            }
        })
        return peticion;
    }


    sendServerData(endpoint,token,metodo){
        var peticion = fetch(this.urlServer + endpoint,
        {
            method:metodo,
            headers:{
                'x-access-token': token, 
                'Accept':'application/json, text/plain, */*',
                'Content-Type':'application/json'
            }
        })
        return peticion;
    }

}