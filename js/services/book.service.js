'use strict'

const STORAGE_KEY = 'bookDB'

var gFilterBy = [{ maxPrice: 100 }, { minRate: 0 }]
var gBooks

function getBooksForDisplay() {
    const books = loadFromStorage(STORAGE_KEY)
    if (!books || books === []) _creatBooks()
    else gBooks = books
    console.log('gBooks 1: ', gBooks)

    var booksForDisplay = gBooks.filter(book => (book.price <= gFilterBy[0].maxPrice)
        && (book.rate >= gFilterBy[1].minRate))

    return booksForDisplay
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

function setBooksFilter(filterBy = {}) {
    if (filterBy.maxPrice !== undefined) gFilterBy[0].maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy[1].minRate = filterBy.minRate

    console.log('gFilterBy: ', gFilterBy)
    return gFilterBy
}

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