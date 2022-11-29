import { Container } from "@mui/system"
import Grid from '@mui/material/Grid';
import { ProductoForm } from "../../components/ProductoForm/ProductoForm";
import { Component } from "react";
import { ApiConnectionServer } from "../../data/ApiConnectionServer";
import { ProductoTable } from "../../components/ProductoTable/ProductoTable";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export class Producto extends Component{
    
    state = {
        categorias:[],
        productos:[],
        isloading:false
    }

    constructor(props){
        super(props);  
        this.reLoadTable.bind(this);    
    }


    //Obtiene las categorias para poder seleccionar la categoria del producto.
    getCategorias(){
        const api = new ApiConnectionServer();
        const userdata = JSON.parse(localStorage.getItem("usuario"));
        const serverResponse = api.getDataToken('/categoria/getall',userdata.token);
        serverResponse.then((data) => {
            return data.json();
        }).then((jsonresponse) =>{
            if(jsonresponse.code == 200){
                this.setState({categorias : jsonresponse.data})
            }
            else{
                alert(jsonresponse.message);
            }
        }).catch((error) =>{

        })
    }

    //Metodo que llama al servidor y obtiene las categorias.
    getProductos(){
        const callApi = new ApiConnectionServer();
        const userdata = JSON.parse(localStorage.getItem("usuario"));
        this.setState({isloading:true}, () => {
            const serverResponse = callApi.getDataToken('/producto/getall',userdata.token);
            serverResponse.then((data) => {
                return data.json();
            }).then((jsonresponse) =>{
                this.setState({isloading:false})
                if(jsonresponse.code == 200){
                    this.setState({productos : jsonresponse.data})
                }
                else{
                    alert(jsonresponse.message);
                }
            }).catch((error) =>{
                this.setState({isloading:false})
            })
        })
        
    }

    componentDidMount(){
       this.getCategorias();
       this.getProductos()
    }

    //Recarga la cantidad de productos
    reLoadTable(){
        this.getProductos()
    }

    render(){
        return(
            <>
                <Container maxWidth="xl">
                    <h1 style={{ color:'black' }}>Productos</h1>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <h3 style={{ color:'black' }}>Registrar un producto.</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3 style={{ color:'black' }}>Productos registrados en el sistema.</h3>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <ProductoForm reloadtable={this.reLoadTable.bind(this)} categorias={this.state.categorias}></ProductoForm>
                        </Grid>
                        <Grid item xs={6}>
                            {
                                this.state.isloading && <Box sx={{ display: 'flex' }}>
                                                            <CircularProgress />
                                                        </Box>
                            }
                            {
                                !this.state.isloading && <ProductoTable reloadtable={this.reLoadTable.bind(this)} productos={this.state.productos}></ProductoTable>
                            }
                            
                        </Grid>
                    </Grid>
                </Container>
                
            </>
        )
    }
}