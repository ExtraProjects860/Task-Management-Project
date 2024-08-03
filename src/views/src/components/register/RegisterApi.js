export async function register(name, email, password) {
    try {
        const response = await fetch('http://localhost:3001/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }),
            credentials: 'include',
        });

        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao fazer o cadastro');
        }

    } catch (error) {
        throw new Error(error.message || 'Erro ao realizar requisição ao servidor!');
    }    
}