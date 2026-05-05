const API_URL = 'http://localhost:3000';

export const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
    }
    return response.json();
};
