import { Container } from "@mui/system"
import DashBoard from "../Dashboard/Dashboard"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CategoriaForm } from "../../components/CategoriaForm/CategoriaForm";
import { CategoriaTable } from "../../components/CategoriaTable/CategoriaTable";
import { Component } from "react";



export class Categoria extends Component{

    //1.
    constructor(props){
        super(props);
    }

    
    //3.
    render(){           
        return(
            <>
                <Container maxWidth="xl">
                    <h1 style={{ color:'black' }}>Categorias</h1>
    
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <h3 style={{ color:'black' }}>Nueva categoria</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3 style={{ color:'black' }}>Categorias registradas</h3>
                        </Grid>
                    </Grid>
    
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <CategoriaForm></CategoriaForm>
                        </Grid>
                        <Grid item xs={6}>
                            <CategoriaTable></CategoriaTable>
                        </Grid>
                    </Grid>
                </Container>
                
            </>
        )
    }
}