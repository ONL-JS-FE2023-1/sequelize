import React, { useState, useEffect } from 'react';
import { getGroups } from '../../api';
import GroupCard from './GroupCard';
import GroupCardModal from './GroupCardModal';
import AddGroupFormModal from './AddGroupFormModal';

const GroupList = () => {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // Стан для зберігання обраної групи
    const [selectedGroup, setSelectedGroup] = useState(null);
    // Стан для відкриття/закриття модального вікна ПЕРЕГЛЯДУ ІНФОРМАЦІЇ
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Стан для відкриття/закриття модального вікна ДОДАВАННЯ ГРУПИ
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    const loadGroups = () => {
        getGroups()
        .then((data) => {
            setGroups(data);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        loadGroups();
    }, [])

    const renderGroups = () => {
        return groups.map((group) => 
        <GroupCard 
        group={group} 
        key={group.id} 
        onClick={() => { // Це не обробник, це пропс!
            setSelectedGroup(group);
            setIsModalOpen(true);
        }}
        />);
    }
    
    return (
        <>
            <h1>Group List</h1>
            <button onClick={() => setIsModalAddOpen(true)}>Add group</button>
            <section className='card-container'>
                {error && <h2 style={{backgroundColor: 'red', color: 'white'}}>{error.message}</h2>}
                {groups.length > 0 ? renderGroups() : <h2>Груп немає</h2>}
            </section>

            {/* Модальні вікна */}
            <GroupCardModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedGroup={selectedGroup}
            />
            <AddGroupFormModal
                isModalOpen={isModalAddOpen}
                setIsModalOpen={setIsModalAddOpen}
                loadGroups={loadGroups}
            />
        </>
    );
}

export default GroupList;
