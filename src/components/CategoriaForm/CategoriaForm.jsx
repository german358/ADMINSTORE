import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ApiConnectionServer } from '../../data/ApiConnectionServer';
import CircularProgress from '@mui/material/CircularProgress';


export const CategoriaForm = () =>{

    const [file, setFile] = useState();
    const [formdata,setFormData]= useState();
    const [isLoading,setIsLoading] = useState(false);

    const addFile = (event) => {
        setFile(event.target.files[0]);
    }

    //Asigna los datos al estado
    const handleChange =(prop) => (event) => {
        setFormData({...formdata, [prop]: event.target.value})
    };

    const  convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
    }


    const  createCategoria = async () => {
        let api = new ApiConnectionServer();
       
        setIsLoading(true);
        const userdata = JSON.parse(localStorage.getItem("usuario"));

        const base64 = await convertBase64(file)
   
        const serverObject = {
            nombre:formdata.nombre,
            descripcion:formdata.descripcion,
            imagen : {
                data:base64.split(',')[1],
                url:null,
                name:file.name
            }
        }
        
        const peticion = api.postDataAuth(serverObject,'categoria/create',userdata.token);
        peticion.then((data) => {
            setIsLoading(false);
            return data.json();
        }).then((responseJson) =>{
            setIsLoading(false);
            console.log(responseJson);
            switch(responseJson.code){
                case 200:
                    alert(responseJson.message);
                    break;
                case 500:
                    alert(responseJson.message);
                    break;
                case 401:
                    alert(responseJson.message);
                    break;
            }
        }).catch((error) => {
            alert(error);
            console.log(error);
            setIsLoading(false);
        })
    }


    return(

        <Card>
          <CardContent>
          <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, },
            }}
            noValidate
            autoComplete="off">
          <div>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Nombre categoria"
              onChange={handleChange('nombre')}/>
          </div>
          <div>
          <TextField
              id="outlined-multiline-static"
              label="Descripción categoria"
              onChange={handleChange('descripcion')}
              multiline
              rows={4}
              fullWidth
              defaultValue=""/>
          </div>
          <div>
            <Typography variant="h6" component="h6">
                    Seleccione una imagen
            </Typography>
            <TextField
                type="file"
                onChange={addFile}
                fullWidth/>
          </div>
        </Box>
          </CardContent>
          <CardActions>
            {
              !isLoading && <Button onClick={() =>{
                    createCategoria()
                }} size="small">Crear</Button>
            }
            {
              isLoading &&  <CircularProgress />
            }
            <Button size="small">Limpiar</Button>
      </CardActions>
    </Card>

       


    );


}