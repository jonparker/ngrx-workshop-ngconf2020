import { Component, OnInit } from "@angular/core";
import {
  BookModel,
  BookRequiredProps
} from "src/app/shared/models";
import { BooksService } from "src/app/shared/services";
import { Store } from '@ngrx/store';
import { BooksPageActions, BooksApiActions } from '../../actions';
import { Observable } from 'rxjs';
import { selectBooksEarningsTotals, State, selectActiveBook, selectAllBooks } from 'src/app/shared/state';

@Component({
  selector: "app-books",
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"]
})
export class BooksPageComponent implements OnInit {
  books$: Observable<BookModel[]>;
  currentBook$: Observable<BookModel | undefined>;
  total$: Observable<number>;

  constructor(private booksService: BooksService, private store: Store<State>) {
    this.total$ = store.select(selectBooksEarningsTotals);
    this.currentBook$ = store.select(selectActiveBook);
    this.books$ = store.select(selectAllBooks);
  }

  ngOnInit() {
    this.store.dispatch(BooksPageActions.enter());
  }

  onSelect(book: BookModel) {
    this.store.dispatch(BooksPageActions.selectBook({ bookId: book.id}))
  }

  onCancel() {
    this.store.dispatch(BooksPageActions.clearSelectBook())
  }

  onSave(book: BookRequiredProps | BookModel) {
    if ("id" in book) {
      this.updateBook(book);
    } else {
      this.saveBook(book);
    }
  }

  saveBook(bookProps: BookRequiredProps) {
    this.store.dispatch(BooksPageActions.createBook({ book: bookProps }));
    this.booksService.create(bookProps).subscribe(book => {
      this.store.dispatch(BooksApiActions.bookCreated({ book }))
    });
  }

  updateBook(book: BookModel) {
    this.store.dispatch(BooksPageActions.updateBook({ bookId: book.id, changes: book }));
    this.booksService.update(book.id, book).subscribe(() => {
      this.store.dispatch(BooksApiActions.bookUpdated({ book }));
    });
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BooksPageActions.deleteBook({ bookId: book.id }));
    this.booksService.delete(book.id).subscribe(() => {
      this.store.dispatch(BooksApiActions.bookDeleted({ bookId: book.id }));
    });
  }
}
