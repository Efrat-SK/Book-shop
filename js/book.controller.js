'use strict'

function init() {
    renderBooks()
}

function renderBooks() {
    const books = getBooksForDisplay()
    const strHTMLs = books.map(book =>
        `<tr class="'${book.id}'">
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td>
            <button class="read-btn action-btn" onclick="onReadBook('${book.id}')">Read</button>
            <button class="update-btn action-btn" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="delete-btn action-btn" onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
    </tr>`
    )

    document.querySelector('.books-container').innerHTML = strHTMLs.join('')
}

function onReadBook(bookId) {
    console.log('read', bookId)

    const book = getBookById(bookId)
    const elModal = document.querySelector('.modal')
    elModal.querySelector('.book-name-modal').innerText = book.title
    elModal.querySelector('.book-price-modal span').innerText = book.price
    elModal.querySelector('.book-desc-modal').innerText = book.desc
    renderRateArea(bookId)
    elModal.classList.add('open')
}

function renderRateArea(bookId) {
    const book = getBookById(bookId)
    const strHTML =
        `<button class="rate-btn minos" onclick="onChangeRate(${-1} , '${bookId}')">-</button>
    <div class="rat-num">${book.rate}</div>
    <button class="rate-btn plus" onclick="onChangeRate(${1} , '${bookId}')">+</button>`

    document.querySelector('.rate-container').innerHTML = strHTML
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function onUpdateBook(bookId) {

    const bookPrice = prompt('Enter new price')
    updateBook(bookId, bookPrice)

    renderBooks()
}

function renderBook(bookId) { ///////////////////////////////////////////////////////////////////////////////

    const books = getgBooks()
    console.log('books: ', books)
    const idx = books.findIndex(book => book.id === bookId)
    const book = books[idx]

    const strHTML =
        `<tr class="'${book.id}'">
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td>
            <button onclick="onRead()">Read</button>
            <button onclick="onUpdateBook('${book.id}')">Update</button>
            <button onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
    </tr>`

    document.querySelector(`.${book.id}`).innerHTML = strHTML
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    const name = prompt('Enter book\'s name')
    const price = prompt('Enter  book\'s price')

    addBook(name, price)
    renderBooks()
}

function onChangeRate(action, bookId) {
    const book = getBookById(bookId)
    switch (action) {
        case 'minos':
            if (book.rate > 0) --book.rate
            break;
        case 'plus':
            if (book.rate < 10) ++book.rate
            break;
    }
    renderRateArea(bookId)
}

function onsetFilter(filter) {
    switch (filter) {
        case 'non':
            console.log('none')
            break;

        case 'price':
            console.log(filter)
            sortBooks(filter)
            break;

        case 'rate':
            console.log(filter)
            sortBooks(filter)

            break;
    }
    renderBooks()
}

