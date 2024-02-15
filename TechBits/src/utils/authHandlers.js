import { clearUserData } from '../utils/UserData'
export async function handleSignUp(evt, formData) {
    evt.preventDefault();
    const finalFormData = { username: formData.username, name: { first: formData.firstName, last: formData.lastName }, email: formData.email, password: formData.password }
    const signUpResponse = await fetch('http://localhost:3000/user/sign-up', {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData)
    })
    return await signUpResponse.json();
}

export async function handleLogIn(evt, formData) {
    evt.preventDefault();
    const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })
    return await response.json()
}

export async function handleLogout(isLoggedIn, setIsLoggedIn) {
    if (isLoggedIn) {
        const response = await fetch('http://localhost:3000/user/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const res = await response.json()
        if (!res.error) {
            clearUserData();
            localStorage.removeItem('isLoggedIn');
            setIsLoggedIn(false);
            return '/';
        }
        else {
            clearUserData();
            localStorage.removeItem('isLoggedIn');
            setIsLoggedIn(false);
            return '/';
        }
    }
}