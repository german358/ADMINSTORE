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
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Link as LinkRouter } from 'react-router-dom';
import Link from '@mui/material/Link';
import { ApiConnectionServer } from "../../data/ApiConnectionServer";
import CircularProgress from '@mui/material/CircularProgress';

export class Registro extends Component{

    state = {
        flagPassword: false,
        flagValidatePassowrd:false,
        loading: false,
        validform : false,
        nombres:'',
        apellidos:'',
        correo:'',
        password:'',
        validapassword:''
    }
    apiServer = new ApiConnectionServer()

    constructor(props){
        super(props)
    }

    //Valida si debe o no mostrar la contraseña escrita.
    showPassword(item){
        if(item === 'password'){
            const actual = this.state.flagPassword;
            this.setState({flagPassword : !actual})
        }
        else{
            const actual = this.state.flagValidatePassowrd;
            this.setState({flagValidatePassowrd : !actual})
        }
    }

    //Valida las modificaciones en cada caja de texto
    handleChange = (prop) => (event) => {
        this.setState({ ...this.state, [prop]: event.target.value });
    };


    //realiza el registro

    doRegistro(){
        var serverObject ={
            nombres: this.state.nombres,
            apellidos: this.state.apellidos,
            correo: this.state.correo,
            password: this.state.password
        }
        this.setState({loading:true});
        const peticion = this.apiServer.postData(serverObject,'user/create');
        peticion.then((data) => {
            this.setState({loading:false});
            return data.json();
        }).then((responseJson) =>{
            this.setState({loading:false});
            switch(responseJson.code){
                case 200:
                    alert(responseJson.message);
                    localStorage.setItem("usuario",JSON.stringify(responseJson.data));
                    window.location = '/';
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

    render(){
        return(
            <>
                <Card style={{ margin:'20px' }}>
                    <h1 style={{ margin:'20px' }}>Tienda online - Gestión administración.</h1>
                </Card>
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
                        onChange={this.handleChange('nombres')}
                        defaultValue=""
                    />
                    <TextField
                        label="Apellidos"
                        onChange={this.handleChange('apellidos')}
                        defaultValue=""
                    />
                     <TextField
                        label="Correo electronico"
                        onChange={this.handleChange('correo')}
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
                                                this.showPassword('password')
                                           }}
                                        >
                                        {!this.state.flagPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Contraseña"
                            />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Valida contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                onChange={this.handleChange('validapassword')}
                                type={this.state.flagValidatePassowrd ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                            onClick={() =>{
                                                this.showPassword('validate')
                                           }}
                                        >
                                        { !this.state.flagValidatePassowrd ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Valida contraseña"
                            />
                    </FormControl>
                </div>
                </Box>
                </CardContent>
                <CardActions>
                    <Grid
   
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        {   !this.state.loading &&
                           <Button onClick={()=> {
                            this.doRegistro();
                        }} variant="contained">Registrarse</Button>
                        }
                        {    this.state.loading &&<CircularProgress justifyContent="center" /> }
                        

                        <Link style={{ margin:'10px' } }
                            component="button"
                            variant="body2">
                            
                            <LinkRouter to="/">
                            Ir al login
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