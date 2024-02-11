import { clearUserData } from '../utils/UserData'
export async function handleLogout(isLoggedIn, setIsLoggedIn) {
    if (isLoggedIn) {
        clearUserData();
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false)
        return window.location.reload();
    }
}