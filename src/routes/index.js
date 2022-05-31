import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../pages/Main";
import { Login } from "../pages/Login";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<Login/>}></Route>
                <Route exact path="/dev/:id" element={<Main/>}></Route>
                <Route path="*" element={<Login/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export { Router };