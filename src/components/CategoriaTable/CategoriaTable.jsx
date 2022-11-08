import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';


export const CategoriaTable = () =>{

    const [categorias,setCategorias] = useState([]);


    

    return(
        <>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Descripción<nav></nav></TableCell>
                    <TableCell align="right">Imagen</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                
                </TableBody>
            </Table>
            </TableContainer>
        </>
    )
}