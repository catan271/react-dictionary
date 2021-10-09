export function saveWord(word) {
    const bookmark = getBookmark()
    const newBookmark = [word, ...bookmark.filter(each => each.word !== word.word || each.lang !== word.lang)]
    window.localStorage.setItem('bookmark', JSON.stringify(newBookmark))
}

export function getBookmark() {
    const bookmark = JSON.parse(window.localStorage.getItem('bookmark')) || []
    return bookmark.filter(word => word.word)
}