import { createAction, props } from "@ngrx/store";
import { BookModel } from "src/app/shared/models";
import { BooksModule } from '../books.module';

export const booksLoaded = createAction(
    '[Books API] Books Loaded Success',
    props<{ books: BookModel[] }>()
)

export const bookUpdated = createAction(
    '[Books API] Book Updated Success',
    props<{book: BookModel}>()
);

export const bookCreated = createAction(
    '[Books API] Created Book Success',
    props<{ book: BookModel }>()
);

export const bookDeleted = createAction(
    '[Books API] Deleted Book Success', 
    props<{bookId: string}>()
);