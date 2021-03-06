const signin = async (user) => {
    try {
        let response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        });
        return response.json();
    } catch (err) {
        console.error(err);
    }
}

const signout = async () => {
    try {
        let response = await fetch('/api/auth/signout', { method: 'GET' });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

export default { signin, signout }