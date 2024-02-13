import { clearUserData } from '../utils/UserData'
export async function handleLogout(isLoggedIn, setIsLoggedIn) {
    if (isLoggedIn) {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const res = await response.json()
        if (res.status === 200) {
            clearUserData();
            localStorage.removeItem('isLoggedIn')
            setIsLoggedIn(false)
            return window.location.reload();
        }
    }
    else {
        clearUserData();
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false)
        return window.location.reload();
    }
}