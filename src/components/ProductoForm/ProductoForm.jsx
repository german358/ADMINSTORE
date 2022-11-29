import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ApiConnectionServer } from '../../data/ApiConnectionServer';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export const ProductoForm = (props) =>{

    const [file, setFile] = useState(null);
    const [formdata,setFormData]= useState();
    const [isLoading,setIsLoading] = useState(false);
    const [select,setSelect] = useState('');

    const addFile = (event) => {
        setFile(event.target.files[0]);
    }

    //Asigna los datos al estado
    const handleChange =(prop) => (event) => {
        if(prop === "categoriaid"){
          setSelect(event.target.value);
        }
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


    const  createProducto = async () => {
        let api = new ApiConnectionServer();  
        setIsLoading(true);
        const userdata = JSON.parse(localStorage.getItem("usuario"));

        let base64  = null;

        if(file !== null){
          base64 = await convertBase64(file)
          formdata.imagen = {
              data:base64.split(',')[1],
              url:null,
              name:file.name
          }
        }

        const serverObject = {
          nombre:formdata.nombre,
          descripcion:formdata.descripcion,
          precio:formdata.precio,
          cantidaddisponible:formdata.cantidaddisponible,
          categoriaid:formdata.categoriaid,
          imagen : {
              data:base64.split(',')[1],
              url:null,
              name:file.name
          }
      }
       
        const peticion = api.postDataAuth(serverObject,'producto/create',userdata.token);
        peticion.then((data) => {
            setIsLoading(false);
            return data.json();
        }).then((responseJson) =>{
            setIsLoading(false);
            console.log(responseJson);
            switch(responseJson.code){
                case 200:
                    alert(responseJson.message);
                    props.reloadtable();
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
            <InputLabel id="demo-simple-select-label">Seleccione la categoria</InputLabel>
            <Select
            fullWidth
            value={select}
            labelId="demo-simple-select-label"
            label="Seleccione la categoria"
            onChange={handleChange('categoriaid')}>
                {
                  props.categorias.map((data,index) =>{
                    return  <MenuItem key={index} value={data._id}>{data.nombre}</MenuItem>
                  })
                }
            </Select>
          </div>
          <div>
            <TextField
              fullWidth
              label="Nombre del producto"
              onChange={handleChange('nombre')}/>
          </div>
          <div>
          <TextField
              label="Descripción del producto"
              onChange={handleChange('descripcion')}
              multiline
              rows={4}
              fullWidth
              defaultValue=""/>
          </div>
          <div>
            <TextField
              fullWidth
              label="Precio del producto"
              onChange={handleChange('precio')}/>
          </div>
          <div>
            <TextField
              fullWidth
              label="Cantidad disponible"
              onChange={handleChange('cantidaddisponible')}/>
          </div>
          <div>
            <Typography variant="h6" component="h6">
                    Seleccione una imagen para el producto
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
                  createProducto()
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