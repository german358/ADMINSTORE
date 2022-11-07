import { Component } from "react";
import { Navigate } from "react-router-dom";


export class Dashboard extends Component{


    constructor(props){
        super(props)
        this.state = {
            isLogin: false,
            userdata : null
        };
    }


    static getDerivedStateFromProps(props,state) {
       const data = localStorage.getItem("usuario");
       
       if(data != null){
            return {
                isLogin: true,
                userdata: JSON.parse(data)
            };
       }
    }


    render(){
        if(!this.state.isLogin){
            return(
                <>
                    <Navigate to="/" replace={true} ></Navigate>
                </>
            )
        }
        return(
            <>
                <h1>Bienvenidos {this.state.userdata.nombres}</h1>
            </>
        )        
    }
}