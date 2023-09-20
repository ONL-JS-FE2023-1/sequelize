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