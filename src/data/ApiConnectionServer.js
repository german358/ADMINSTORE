
export class ApiConnectionServer{

    postData(bodyData,endpoint){
        var requestData = JSON.stringify(bodyData);

        var peticion = fetch("http://localhost:9000/api/" + endpoint,
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


    getData(endpoint){
        var peticion = fetch("http://localhost:9000/api/" + endpoint);
        return peticion;
    }

}