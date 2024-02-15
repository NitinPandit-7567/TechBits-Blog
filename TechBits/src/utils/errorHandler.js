export default function errorHandler(res, setError) {
    if (res.error.status === 404) {

        res.error.message = 'You are not authorized to perform this acitivty.'
        setError(res.error)
        return '/'
    }
    else if (res.error.status === 401) {
        res.error.logout = true;
        res.error.message = "You need to sign in to continue!"
        setError(res.error)
        return '/login'
    }
    else if (Number(res.error.status) === 400) {
        setError({ message: res.error.message })
        return '/signUp'
    }
    else {
        res.error.message = `${res.error.status}: ${res.error.message}`;
        setError(res.error);
        return '/'
    }
}