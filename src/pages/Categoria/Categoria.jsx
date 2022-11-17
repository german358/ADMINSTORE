import { Container } from "@mui/system"
import DashBoard from "../Dashboard/Dashboard"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CategoriaForm } from "../../components/CategoriaForm/CategoriaForm";
import { CategoriaTable } from "../../components/CategoriaTable/CategoriaTable";
import { Component } from "react";
import { ApiConnectionServer } from "../../data/ApiConnectionServer";



export class Categoria extends Component{

    state = {
        categorias:[],
        isLoading: false
    };

    //1.
    constructor(props){
        super(props);
        this.reLoadTable.bind(this);
    }

    getCategorias(){
        let callApi = new ApiConnectionServer()
        const userdata = JSON.parse(localStorage.getItem("usuario"));
        const serverResponse = callApi.getDataToken('/categoria/getall',userdata.token);
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
            alert("Error " + error);
        })
    }

    componentDidMount(){
        this.getCategorias();
    }

    reLoadTable(){
        this.getCategorias();
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
                            <CategoriaForm reloadtable={this.reLoadTable.bind(this)}></CategoriaForm>
                        </Grid>
                        <Grid item xs={6}>
                            <CategoriaTable categorias={this.state.categorias}></CategoriaTable>
                        </Grid>
                    </Grid>
                </Container>
                
            </>
        )
    }
}