const API_URL = 'http://localhost:3000';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const register = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de l'inscription");
    }
    return response.json();
};

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Identifiants incorrects');
    }
    const data = await response.json();
    console.log("Login data received:", data);
    return data;
};

export const getProfile = async () => {
    console.log("Tentative de récupération du profil...");
    try {
        const response = await fetch(`${API_URL}/auth`, {
            method: 'GET',
            headers: getHeaders(),
        });

        console.log("Réponse profil reçue status:", response.status);

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
            throw new Error('Non autorisé');
        }

        const data = await response.json();
        console.log("Données profil:", data);
        return data;
    } catch (error) {
        console.error("Erreur dans getProfile:", error);
        throw error;
    }
};
