import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Component } from 'react';
import { ApiConnectionServer } from '../../data/ApiConnectionServer';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import OpcionTabla from '../OpcionTabla/OpcionTabla';

export class CategoriaTable extends Component{

    constructor(props){
        super(props);
        this.state = {
            categorias:[],
            isLoading: false
        };
    }

    callApi = new ApiConnectionServer();
    

    //Metodo que llama al servidor y obtiene las categorias.
    getCategorias(){
        const userdata = JSON.parse(localStorage.getItem("usuario"));
        this.setState({isLoading:true})
        const serverResponse = this.callApi.getDataToken('/categoria/getall',userdata.token);
        serverResponse.then((data) => {
            this.setState({isLoading:false})
            console.log(data);
            return data.json();
        }).then((jsonresponse) =>{
            this.setState({isLoading:false})
            console.log(jsonresponse);
            if(jsonresponse.code == 200){
                this.setState({categorias : jsonresponse.data})
            }
            else{
                alert(jsonresponse.message);
            }
        }).catch((error) =>{
            this.setState({isLoading:false})
            alert("Error " + error);
        })
    }


    componentDidMount() {
        this.getCategorias();
     }

    render(){
        if(this.state.isLoading){
            return(
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )
        }

        return(
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="left">Descripción<nav></nav></TableCell>
                            <TableCell align="left">Imagen</TableCell>
                            <TableCell align="left">Acciones</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.categorias.map((row,index) => (
                                
                                <TableRow key={index}
                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.nombre}
                                    </TableCell>
                                    <TableCell align="left">{row.descripcion}</TableCell>
                                    <TableCell align="center">
                                        <img src={row.imagen.url} width="50px" />
                                    </TableCell>
                                    <TableCell>
                                        <OpcionTabla></OpcionTabla>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
}
}