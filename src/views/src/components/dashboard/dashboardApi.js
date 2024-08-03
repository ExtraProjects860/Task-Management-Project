


export async function getTasksList() {
    try {
        const response = await fetch('http://localhost:3001/tasks-lists/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            
            credentials: 'include', // Ensure credentials are sent
        });

        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao buscar lista de tasks');
        }
        
    } catch (error) {
        throw new Error(error.message || 'Erro ao realizar requisição ao servidor!');
    }
}
