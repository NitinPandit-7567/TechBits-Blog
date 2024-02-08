export function setData(data) {
    console.log(data)
    return sessionStorage.setItem('user', { username: data.username, name: data.name, email: data.email })
}

export function getData() {
    const user = sessionStorage.getItem('user');
    if (user) {
        return { ...user }
    }
    else {
        return false
    }
}

export function clearData() {
    return sessionStorage.setItem('user', 'false')
}