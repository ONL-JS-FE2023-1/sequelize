import React, { useState, useEffect } from 'react';
import { getGroups } from '../../api';
import GroupCard from './GroupCard';
import GroupCardModal from './GroupCardModal';

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
            <section className='card-container'>
                {error && <h2 style={{backgroundColor: 'red', color: 'white'}}>{error.message}</h2>}
                {groups.length > 0 ? renderGroups() : <h2>Груп немає</h2>}
            </section>

            {/* Модальні вікні */}
            <GroupCardModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedGroup={selectedGroup}
            />
        </>
    );
}

export default GroupList;
