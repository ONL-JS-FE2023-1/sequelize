import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {top: '50%',left: '50%',right: 'auto',bottom: 'auto',marginRight: '-50%',transform: 'translate(-50%, -50%)',},
};


const GroupCardModal = (props) => {
    const {selectedGroup} = props;
    return (
        <Modal
                isOpen={props.isModalOpen}
                onRequestClose={() => props.setIsModalOpen(false)}
                style={customStyles}
            >
                {props.selectedGroup && (
                    <div>
                        <img 
                        src={`http://localhost:5000/${selectedGroup.imagePath}`} 
                        alt={selectedGroup.name}
                        style={{width: '300px', height: '300px'}} 
                        />
                        <h2>{selectedGroup.name}</h2>
                        <p>Description: {selectedGroup.description}</p>
                        <p>Created At: {selectedGroup.createdAt}</p>
                        <p>Updated At: {selectedGroup.updatedAt}</p>
                        <button onClick={() => props.setIsModalOpen(false)}>Close</button>
                    </div>
                )}
        </Modal>
    );
}

export default GroupCardModal;
