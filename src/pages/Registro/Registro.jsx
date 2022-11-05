import { Component } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export class Registro extends Component{

    render(){
        return(
            <>
                <Container className="login" maxWidth="sm">
                <Card sx={{ minWidth: 275 }}>
                <h1 style={{ margin:'20px' }}>Registro de usuario</h1>
                <h6 style={{ margin:'20px' }}>Por favor coloque la información para su registro.</h6>
                <CardContent>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' }
                    }}
                    noValidate
                    autoComplete="off">
                <div>
                    <TextField
                        label="Nombres"
                        defaultValue=""
                    />
                    <TextField
                        label="Apellidos"
                        defaultValue=""
                    />
                     <TextField
                        label="Correo electronico"
                        defaultValue=""
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        defaultValue=""
                    />
                    <TextField
                        label="Validar contraseña"
                        type="password"
                        defaultValue=""
                    />
                </div>
                </Box>
                </CardContent>
                <CardActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Button variant="contained">Registrarse</Button>
                    </Grid>
                    
                </CardActions>
                </Card>
                </Container>
            </>
        )
    }
}