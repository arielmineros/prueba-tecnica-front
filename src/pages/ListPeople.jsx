import { useEffect, useState } from "react";
//var base_url = "https://localhost:44309/api/Person";
import {base_url} from "../assets/api.js";
//var baseUrl = base_url;
import {Link} from 'react-router-dom';

function ListPeople(){

    const [person, setPerson] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetch(base_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(!response.ok){
                throw new Error('Error al traer los datos');
            }
            console.log(response);
            return response.json();
        }).then(data=>{
            setPerson(data);
            //console.log(data);
            setLoading(false);
        }).catch(error=>{
            setError(error);
            setLoading(false);
        })
    }, []);

    if(loading){
        return (
            <div>Cargando...</div>
        );
    }
    if(error){
        return(
            <div>Error: {error.message}</div>
        );
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800 p-6">
            <div className="bg-slate-500 p-10 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">Listing People</h1>
                <ul className="space-y-4">
                    {person.map(person => (
                        <li
                            key={person.id}
                            className="p-3 bg-zinc-700 text-white rounded-md shadow-sm hover:bg-zinc-600 transition-colors"
                        >
                            <span className="font-bold">{person.id} </span>
                            <span>{person.firstName}</span> - <span className="">{person.lastName}</span>
                            <Link to='/update-person'><svg class="h-6 w-6 text-green-200"  width="24"  height="24"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></Link>
                            <Link to='/delete-person'><svg class="h-6 w-6 text-red-200"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />  <line x1="18" y1="9" x2="12" y2="15" />  <line x1="12" y1="9" x2="18" y2="15" /></svg></Link>
                            
                        </li>
                        
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ListPeople;