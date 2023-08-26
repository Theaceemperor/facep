

export const hoursAgo = (pastTimestamp) => {
    const currentTimeStamp = new Date().getTime();
    const diff = currentTimeStamp - pastTimestamp;
    const hoursPast = Math.floor(diff / 1000 / 60 / 60);
    return hoursPast;
}