import { Route, Routes } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { Login } from "./pages/Login/Login"
import { Registro } from "./pages/Registro/Registro"



export const RuteosApp = () =>{

    return(
        <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/registro" element={<Registro></Registro>}></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}>
                
            </Route>
        </Routes>
    )
}