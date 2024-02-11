export default function getInitials(user) {
    if (user) {
        const fullName = (user.name).split(' ');
        return fullName[0][0] + fullName[fullName.length - 1][0];
    }
    else {
        return 'U'
    }
}