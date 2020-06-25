import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";

const createBook = (books: BookModel[], book: BookModel) => [...books, book];
// creates a new array with applied change
const updateBook = (books: BookModel[], changes: BookModel) => books.map(book => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
});
const deleteBook = (books: BookModel[], bookId: string) => books.filter(book => bookId !== book.id);

export interface State {
    collection: BookModel[],
    activebookId: string | null;
}

export const initialState: State = {
    collection: [],
    activebookId: null
}

export const booksReducer = createReducer(
    initialState,
    on(
        BooksPageActions.enter,
        BooksPageActions.clearSelectBook,
        (state, action) => ({ ...state, activebookId: null })
    ),
    on(BooksPageActions.selectBook, (state, action) => ({ ...state, activebookId: action.bookId })),
    on(BooksApiActions.booksLoaded, (state, action) => ({ ...state, collection: action.books })),
    on(BooksApiActions.bookCreated, (state, action) => ({ ...state, collection: createBook(state.collection, action.book) })),
    on(BooksApiActions.bookUpdated, (state, action) => ({ ...state, collection: updateBook(state.collection, action.book) })),
    on(BooksApiActions.bookDeleted, (state, action) => ({ ...state, collection: deleteBook(state.collection, action.bookId) })),
);

export function reducer(state: State | undefined, action: Action) {
    return booksReducer(state, action);
}

// "Getter" Selectors
export const selectAll = (state: State) => state.collection;
export const selectActiveBookId = (state: State) => state.activebookId;

// Complex Selectors
export const selectActiveBook = createSelector(
    selectAll,
    selectActiveBookId,
    (books, activeBookId) => books.find(book => book.id === activeBookId)
);

export const selectEarningsTotals = createSelector(
    selectAll,
    calculateBooksGrossEarnings
);

export function selector(state: State) {
    return selectEarningsTotals(state);
}