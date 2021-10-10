export function getBookmark() {
    const bookmark = JSON.parse(window.localStorage.getItem('bookmark')) || []
    return bookmark.filter(word => word.index)
}

export function saveWord(word) {
    const bookmark = getBookmark()
    const newBookmark = [word, ...bookmark.filter(each => each.index !== word.index || each.lang !== word.lang)].slice(0, 5000)
    window.localStorage.setItem('bookmark', JSON.stringify(newBookmark))
}

export function deleteBookmark(word) {
    const bookmark = getBookmark()
    const newBookmark = bookmark.filter(each => each.index !== word.index || each.lang !== word.lang)
    window.localStorage.setItem('bookmark', JSON.stringify(newBookmark))    
}