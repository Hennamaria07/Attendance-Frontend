const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
        const formattedHour = hour % 12 || 12;
        const period = hour < 12 ? 'AM' : 'PM';
        const value = hour < 10 ? `0${hour}:00` : `${hour}:00`;
        times.push({ value, label: `${formattedHour}:00 ${period}` });
    }
    return times;
};

export default generateTimeOptions