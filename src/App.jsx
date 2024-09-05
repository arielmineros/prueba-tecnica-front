import { BrowserRouter, Routes, Route } from "react-router-dom";
//import 
import AddPerson from "./pages/AddPerson";
import ListPerson from "./pages/ListPerson";
import ListPeople from "./pages/ListPeople";
import UpdatePerson from "./pages/UpdatePerson";
import DeletPerson from "./pages/DeletePerson";
import Menu from "./pages/Menu"

function App(){
    return (
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path='/' element={<h1>Home page</h1>} />
                <Route path='/add-person' element={<AddPerson />} />
                <Route path='/list-people' element={<ListPeople />} />
                <Route path='/list-people/:id' element={<ListPerson />} />
                <Route path='/delete-person/:id' element={<DeletPerson />} />
                <Route path='/update-person/:id' element={<UpdatePerson />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App