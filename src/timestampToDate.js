export function timestampToDateTime(timestamp) {
    let date = new Date(timestamp)
    return timestampToDate(timestamp) + " " + date.toLocaleTimeString("it-IT")
}

export function timestampToDate(timestamp) {
    let date = new Date(timestamp)
    return date.toLocaleDateString("it-IT")
}