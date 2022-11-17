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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import TablePagination from '@mui/material/TablePagination';

export class ProductoTable extends Component{


    constructor(props){
        super(props);
    }

    eliminarProducto(id){
        const callApi = new ApiConnectionServer();
        const userdata = JSON.parse(localStorage.getItem("usuario"));
        const serverResponse = callApi.getDataToken('producto/delete/' + id,userdata.token);
          serverResponse.then((data) => {
              return data.json();
          }).then((jsonresponse) =>{
              if(jsonresponse.code == 200){
                  this.props.reloadtable();
              }
              else{
                  alert(jsonresponse.message);
              }
          }).catch((error) =>{
              alert("Error hijo " + error);
          })
    }

    render(){
        return(
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="left">Descripción<nav></nav></TableCell>
                            <TableCell align="left">Imagen</TableCell>
                            <TableCell align="left">Acciones</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.productos.map((row,index) => (
                                
                                <TableRow key={index}
                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.categoriaid.nombre}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.nombre}
                                    </TableCell>
                                    <TableCell align="left">{row.descripcion}</TableCell>
                                    <TableCell align="center">
                                        <img src={row.imagen.url} width="50px" />
                                    </TableCell>
                                    <TableCell>
                                        <Stack spacing={2} direction="row">
                                            <Button size="small" variant="contained" color="error" onClick={() => {
                                                this.eliminarProducto(row._id);
                                            }}>Eliminar</Button>
                                            <Button size="small"  color="success" variant="outlined">Editar</Button>
                                        </Stack>
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