import { Container } from "@mui/system"
import DashBoard from "../Dashboard/Dashboard"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


export const Categoria = () =>{
    return(
        <>
            <Container maxWidth="xl">
                <h1 style={{ color:'black' }}>Categorias</h1>

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <h3 style={{ color:'black' }}>Nueva categoria</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <h3 style={{ color:'black' }}>Categorias registradas</h3>
                    </Grid>
                    <Grid item xs={4}>
                        c
                    </Grid>
                    <Grid item xs={8}>
                        d
                    </Grid>
                </Grid>
            </Container>
            
        </>
    )

}