export function setUserData(data) {
    console.log(data)
    return localStorage.setItem('user', JSON.stringify({ username: data.username, name: data.name, email: data.email }))
}


export function getUserData() {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user)
    }
    else {
        return false
    }
}

export function clearUserData() {
    return localStorage.removeItem('user')
}