export function getHistory() {
    const history = JSON.parse(window.localStorage.getItem('history')) || []
    return history.filter(word => word.index)
}

export function saveWordHistory(word) {
    const history = getHistory()
    const newHistory = [word, ...history.filter(each => each.index !== word.index || each.lang !== word.lang)]
    window.localStorage.setItem('history', JSON.stringify(newHistory))
}