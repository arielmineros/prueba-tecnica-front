import { useForm, useFormState } from "react-hook-form";
import "../../src/"
import { useState } from "react";
import { base_url } from "../assets/api";

function AddPerson(){
    const {register, handleSubmit} = useForm();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasName] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const onFormSubmit = async (e) => {
        //e.preventDefault();
        const newPerson = {
            firstName: firstName,
            lastName: lastName,
        }

        await fetch(`${base_url}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPerson)
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Error al agregar una persona");
            }
            return response.json();
        })
        .then(data => {
            setMessage("Persona agregada exitosamente");
            console.log(data);
            setFirstName("");
            setLasName("");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        })
        .catch(error => {
            setMessage("Hubo un error: " + error.message);
            setShowMessage(true);
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="bg-slate-500 p-10 rounded-md shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">Adding person</h1>
            <form onSubmit={handleSubmit(onFormSubmit)}>

                <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
                placeholder="First name" type="text" 
                value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>

                <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
                placeholder="Last name" type="text" 
                value={lastName} onChange={(e)=> setLasName(e.target.value)} required/>

                <br />
                <br />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Person</button>
            </form>
            {showMessage && <p className="mt-4 text-center">{message}</p>} 
            </div>      
        </div>
    );
}

export default AddPerson;