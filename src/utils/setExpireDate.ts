export const setExpireDate = (days: number) => {
    const today = new Date();
    const expiresDate = new Date();
    expiresDate.setDate(today.getDate() + days);
    return expiresDate;
}