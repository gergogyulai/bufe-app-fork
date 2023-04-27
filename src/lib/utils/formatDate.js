export function formatDate(uglyDate) {
    const date = new Date(uglyDate);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year-2000}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;

    return formattedDate;
}