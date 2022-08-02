'use strict'

const STORAGE_KEY = 'bookDB'

var gBooks

function getBooksForDisplay() {
    // if there are no books in storage - creat them. if there are books- get them.
    const books = loadFromStorage(STORAGE_KEY)
    if (!books || books === []) _creatBooks()
    else gBooks = books

    return gBooks
}

function getgBooks() {
    return gBooks
}

function removeBook(bookId) {
    const idx = _getBookIdxById(bookId)
    gBooks.splice(idx, 1)

    _saveBooksToStorage()
}

function addBook(name, price) {
    const book = _creatBook(name, price)
    gBooks.unshift(book)

    _saveBooksToStorage()
}

function updateBook(bookId, bookPrice) {
    const idx = _getBookIdxById(bookId)
    gBooks[idx].price = bookPrice

    _saveBooksToStorage()
}

function getBookById(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    if (book) return book 
    return null
}

// function setBooksFilter(filterBy = {}) {
//     if (filterBy.vendor !== undefined) gFilterBy.vendor = filterBy.vendor
//     if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
//     return gFilterBy
// }

function _getBookIdxById(bookId) {
    return gBooks.findIndex(book => book.id === bookId)
}

function _creatBooks() {
    gBooks = [
        {
            id: makeId(),
            title: 'Lerning Larvel',
            price: 18.90,
            rate: 0,
            desc: makeLorem(35)

        },
        {
            id: makeId(),
            title: 'Beginning With Larvel',
            price: 6.65,
            rate: 0,
            desc: makeLorem(35)
        },
        {
            id: makeId(),
            title: 'Java for Developers',
            price: 7.20,
            rate: 0,
            desc: makeLorem(35)
        }
    ]
    _saveBooksToStorage()
}

function _creatBook(name, price) {/////////////////////////////////////////////////////////////////////////////
    const book = {
        id: makeId(),
        title: name,
        price: price,
        rate: 0,
        desc: makeLorem(35)
    }
    return book
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}