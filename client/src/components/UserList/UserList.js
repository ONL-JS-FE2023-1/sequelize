import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api';
import UserCard from './UserCard';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

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
        return users.map((user) => <UserCard user={user} key={user.id} />);
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

            <section className='card-container'>
                {error && <h2 style={{backgroundColor: 'red', color: 'white'}}>{error.message}</h2>}
                {users.length > 0 ? renderUsers() : <h2>Юзерів немає</h2>}
                <div>
                    <button onClick={prevBtnHandler} disabled={page === 1}>Previous page</button>
                    <button onClick={nextBtnHandler} disabled={users.length < 5}>Next page</button>
                </div>
            </section>
        </>
    );
}

export default UserList;

// 1. react-router-dom
// 
