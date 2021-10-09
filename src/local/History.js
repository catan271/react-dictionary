export function saveWordHistory(word) {
    const history = getHistory()
    const newHistory = [word, ...history.filter(each => each.word !== word.word || each.lang !== word.lang)]
    window.localStorage.setItem('history', JSON.stringify(newHistory))
}

export function getHistory() {
    return JSON.parse(window.localStorage.getItem('history')) || []
}