export function daysSince(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();

    const timeDifference = currentDate - date;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const daysSince = Math.floor(daysDifference);

    return daysSince;
}