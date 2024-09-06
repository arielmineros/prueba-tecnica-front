import React, {useState} from "react";
import Modal from "react-modal";
import { base_url } from "../assets/api";

Modal.setAppElement("#root");

function DeletPerson({personId, onDelete}){
    const [modalIsOpen, setModalIsOpen] = useState(true);

    function closeModal(){
        setModalIsOpen(false);
    }
    function openModal(){
        setModalIsOpen(true);
    }

    async function confirmDeletion(){
        await fetch(`${base_url}/${personId}`,{
            method: 'DELETE',
        })
        .then((response)=>{
            if(!response.ok){
                throw new Error("Error al eliminar la persona");
            }
            onDelete();
            closeModal();
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    function showingM(){
        console.log('Deleting person')
    }
    return (
        <div>
            {/* <button onClick={openModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete Person
            </button> */}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm Delete"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>¿Está seguro de que desea eliminar a esta persona?</h2>
                <button onClick={confirmDeletion} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Sí, eliminar
                </button>
                <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Cancelar
                </button>
            </Modal>
        </div>
    );
}

export default DeletPerson;