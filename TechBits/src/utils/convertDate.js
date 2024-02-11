export default function convertDate(date) {
    const currentDate = new Date();
    const d = new Date(date)
    const hours = currentDate.getHours() - d.getHours()
    const minutesElapsed = (currentDate.getMinutes() - d.getMinutes());
    if ((currentDate.getDate() - d.getDate()) === 0) {
        if (hours > 1) {
            return `${hours} hours ago`
        }
        else if (hours === 1) {
            if (minutesElapsed > 0) {
                return `${hours} hour ago`
            }
            else {
                return `${60 + minutesElapsed} minutes ago`;

            }
        }
        else {
            const minutesElapsed = (currentDate.getMinutes() - d.getMinutes());
            if (minutesElapsed < 0) {
                return `${60 + minutesElapsed} minutes ago`;
            }
            else if (minutesElapsed > 0) {
                return `${minutesElapsed} minutes ago`;
            }
            else {
                return 'less than a minute ago'
            }

        }
    }
    else if (currentDate.getFullYear() - d.getFullYear() === 0) {
        const day = d.getDate() > 9 ? d.getDate() : '0' + `${d.getDate()}`
        const month = d.getMonth() > 9 ? d.getMonth() : '0' + `${d.getMonth()}`
        return `${day}-${month}-${d.getFullYear()} |  ${d.getHours()}:${d.getMinutes()}`
    }
}