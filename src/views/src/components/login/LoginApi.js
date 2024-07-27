export async function login(email, password) {
    try {
        const response = await fetch('http://localhost:3001/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include', // Ensure credentials are sent
        });

        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao fazer o login');
        }
        
    } catch (error) {
        throw new Error(error.message || 'Erro ao realizar requisição ao servidor!');
    }
}
