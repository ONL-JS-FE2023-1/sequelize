import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api';
import UserCard from './UserCard';
import UserCardModal from './UserCardModal';
import AddUserFormModal from './AddUserFormModal';


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    // Стан для зберігання обраного користувача
    const [selectedUser, setSelectedUser] = useState(null);
    // Стан для відкриття/закриття модального вікна ПЕРЕГЛЯДУ ІНФОРМАЦІЇ
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Стан для відкриття/закриття модального вікна ДОДАВАННЯ КОРИСТУВАЧА
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    const loadUsers = (pageNumber) => {
        getUsers(pageNumber)
        .then((data) => {
            setUsers(data);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        loadUsers(page);
    }, [page])

    const renderUsers = () => {
        return users.map((user) => 
        <UserCard 
        user={user} 
        key={user.id} 
        onClick={() => { // Це не обробник, це пропс!
            setSelectedUser(user);
            setIsModalOpen(true);
        }}
        />);
    }

    const prevBtnHandler = () => {
        if(page > 1) {
            setPage(page - 1);
        }
    }

    const nextBtnHandler = () => {
        setPage(page + 1);
    }

    return (
        <>
            <h1>User List</h1>
            <button onClick={() => setIsModalAddOpen(true)}>Add user</button>

            <section className='card-container'>
                {error && <h2 style={{backgroundColor: 'red', color: 'white'}}>{error.message}</h2>}
                {users.length > 0 ? renderUsers() : <h2>Юзерів немає</h2>}
                <div>
                    <button onClick={prevBtnHandler} disabled={page === 1}>Previous page</button>
                    <button onClick={nextBtnHandler} disabled={users.length < 5}>Next page</button>
                </div>
            </section>

            {/* Модальні вікні */}
            <UserCardModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedUser={selectedUser}
            />
            <AddUserFormModal
                isModalOpen={isModalAddOpen}
                setIsModalOpen={setIsModalAddOpen}
            />
        </>
    );
}

export default UserList;
