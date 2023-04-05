
export function stringToColor(string) {
    let color = '#';
    if (string.length > 2) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

    } else color += '999999'
    return color;
}


export function avatarParams(name) {
    let bgcolor = stringToColor(name ? name : '??');
    let avname = name ? name[0] : '?';
    if (name?.length > 2) avname += name[1];
    return { avname, bgcolor };
}

export function getDateString() {
    const tmpdate = new Date;
    const month = tmpdate.getMonth() + 1;
    const datestr = tmpdate.getDate() + '.' + (month < 10 ? '0' : '') + month + '.' + tmpdate.getFullYear() + ' ' + tmpdate.getHours() + ':' + tmpdate.getMinutes();
    return datestr;
}