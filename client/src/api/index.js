export const getUsers = async (pageNumber) => {
    // limit
    const limit = 5;
    // offset -- || limit * (pageNumber - 1)
    const offset = limit * (pageNumber - 1);
    const url = `http://localhost:5000/api/users/?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const createUser = async (userData) => {
    const url = 'http://localhost:5000/api/users';
    // Об'єкт з параметрами запиту, який далі передаємо fetch
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) // перетворюємо дані користувача в JSON та передаємо в тілі запиту
    };

    // Відправляємо POST-запит
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    // Повертаємо відповідь сервера
    return data;
}

export const getGroups = async () => {
    const url = 'http://localhost:5000/api/groups';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}