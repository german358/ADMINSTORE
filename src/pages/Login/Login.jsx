
import './Login.css';
import { Component } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { ApiConnectionServer } from '../../data/ApiConnectionServer';
import CircularProgress from '@mui/material/CircularProgress';
import { Link as LinkRouter } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Navigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';


export class Login extends Component{


    state = {
        nombreusuario:'',
        password: '',
        flagPassword: false,
        loading: false,
        validform : false
    }

   

    constructor(props){
        super(props);     
    }

    apiServer = new ApiConnectionServer()

    //Realiza la peticion al servidor
    doLogin(){
      
        var serverObject ={
            username: this.state.nombreusuario,
            password: this.state.password
        }
        this.setState({loading:true});
        const peticion = this.apiServer.postData(serverObject,'login');
        peticion.then((data) => {
            this.setState({loading:false});
            return data.json();
        }).then((responseJson) =>{
            this.setState({loading:false});
            switch(responseJson.code){
                case 200:
                    alert(responseJson.message);
                    localStorage.setItem("usuario",JSON.stringify(responseJson.data));
                    window.location = '/dashboard';
                    break;
                case 500:
                    alert(responseJson.message);
                    break;
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({loading:false});
        })
        
    }

    showPassword(){
        const actual = this.state.flagPassword;
        this.setState({flagPassword : !actual})
    }


    handleChange = (prop) => (event) => {
        this.setState({ ...this.state, [prop]: event.target.value });
    };
    

    render(){
        return(
            <>
                <Card style={{ margin:'20px' }}>
                    <h1 style={{ margin:'20px' }}>Tienda online - Gestión administración.</h1>
                </Card>
                <Container className="login" maxWidth="sm">
                <Card sx={{ minWidth: 275 }}>
                <h1 style={{ margin:'20px' }}>Login</h1>
                <h6 style={{ margin:'20px' }}>Por favor coloque sus credenciales de acceso.</h6>
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
                        fullWidth
                        error={this.state.nombreusuario.length > 6 ? '' : 'error'}
                        label="Nombre de usuario"
                        onChange={this.handleChange('nombreusuario')}
                        defaultValue=""
                    />
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                onChange={this.handleChange('password')}
                                type={this.state.flagPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                            onClick={() =>{
                                                this.showPassword()
                                           }}
                                        >
                                        {!this.state.flagPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Contraseña"
                            />
                    </FormControl>
                </div>
                </Box>
                </CardContent>
                <CardActions>
                <Container maxWidth="sm">
                    <Box sx={{ width: '100%' }}>
                            <Stack spacing={2}>
                                {   !this.state.loading &&
                                    <Button fullWidth onClick={() => {
                                        this.doLogin()
                                    }} variant="contained">
                                        Log-In
                                    </Button>
                                }
                                {    this.state.loading &&<CircularProgress justifyContent="center" /> }
                            
                                <Link
                                    component="button"
                                    variant="body2">
                                    
                                    <LinkRouter to="/registro">
                                    ¿No tienes cuenta?
                                    </LinkRouter>
                                </Link>
                            </Stack>
                    </Box>
                </Container>
                </CardActions>
                </Card>
                </Container>
            </>
        )
    }
}