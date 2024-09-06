import { useEffect, useState } from "react";
import { base_url } from "../assets/api";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

function UpdatePerson({personId, onUpdate, closeModal}){
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [personData, setPersonData] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (personId) {
            async function fetchPerson() {
                try {
                    const response = await fetch(`${base_url}/${personId}`);
                    if (!response.ok) {
                        throw new Error("Error al cargar los datos");
                    }
                    const data = await response.json();
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                } catch (error) {
                    setError(error.message || "Error desconocido");
                }
            }
            fetchPerson();
        }
    }, [personId]);

    function closeModal(){
        setModalIsOpen(false);
    }

    function handleSave(){
        fetch(`${base_url}/${personId}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:personId, firstName, lastName}),
        })
        .then(async response=>{
            if(!response.ok){
                const text = await response.text();
                throw new Error(`Error al actualizar persona: ${text}`);
            }
            return;
        })
        .then(()=>{
            onUpdate();
            closeModal();
            navigate('/list-people');
        })
        .catch(error=>{
            setError(error.message);
            console.log(error);
        })
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Updating a person</h1>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Update Person"
            className="bg-slate-500 p-10 rounded-md shadow-md w-full max-w-md mx-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Actualizar Persona</h2>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </Modal>
        </div>
    );
}

export default UpdatePerson;