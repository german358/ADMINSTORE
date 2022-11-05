
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
import Icon from '@mui/material/Icon';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ApiConnectionServer } from '../../data/ApiConnectionServer';
import CircularProgress from '@mui/material/CircularProgress';
import { Link as LinkRouter } from 'react-router-dom';
import Link from '@mui/material/Link';

export class Login extends Component{
    state = {
        nombreusuario:'',
        password: '',
        flagPassword: false,
        loading: false
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

    handleClickShowPassword(){
        this.setState({showPassword: !this.state.showPassword})
    }

    handleChange = (prop) => (event) => {
        this.setState({ ...this.state, [prop]: event.target.value });
    };
    

    render(){
        return(
            <>
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
                    <TextField
                        fullWidth
                        error={this.state.password.length > 10 ? '' : 'error'}
                        label="Contraseña"
                        onChange={this.handleChange('password')}
                        type={this.state.flagPassword ? 'text' : 'password'}
                    />
                    {
                        this.state.flagPassword && <box-icon  onClick={() =>{
                            this.showPassword()
                       }} name='low-vision'></box-icon>
                    }
                    {
                        !this.state.flagPassword && <box-icon  onClick={() =>{
                            this.showPassword()
                       }} name='show'></box-icon>
                    }
                </div>
                </Box>
                </CardContent>
                <CardActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        {    !this.state.loading &&
                            <Button onClick={() => {
                                this.doLogin()
                            }} variant="contained">
                                Log-In
                            </Button>
                        }
                        {    this.state.loading &&
                             <CircularProgress />
                        }
                        <Link
                            component="button"
                            variant="body2">
                            
                            <LinkRouter to="/registro">
                            ¿No tienes cuenta?
                            </LinkRouter>
                        </Link>
                        
                    </Grid>
                    
                </CardActions>
                </Card>
                </Container>
            </>
        )
    }
}