import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAuthor } from 'app/courses/author.model';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.reducer';
import { setAuthorTerm } from 'app/courses/course-edit/store/course.actions';

@Component({
  selector: 'mp-authors-control',
  templateUrl: './authors-control.component.html',
  styleUrls: [ './authors-control.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsControlComponent),
      multi: true,
    },
  ]
})
export class AuthorsControlComponent {
  private value: IAuthor[] = [];

  @Input('authors') authorsList: IAuthor[] = [];

  constructor(private store: Store<AppState>) {
  }

  propagateChange: any = () => {
  };

  propagateTouch: any = () => {
  };

  get authors(): IAuthor[] {
    return this.value;
  }

  set authors(val) {
    this.value = val;
    this.propagateChange(val);
    this.propagateTouch(val);
  }

  writeValue(value): void {
    if (value) {
      this.authors = value;
    }
  }

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn): void {
    this.propagateTouch = fn;
  }

  onAuthorType(textFragment: string): void {
    this.store.dispatch(setAuthorTerm({ payload: textFragment }));
  }

  onAuthorSelect(author: IAuthor): void {
    const exists = this.authors.some(({ id }) => id === author.id);
    if (!exists) {
      this.authors = [ ...this.authors, author ];
    }
  }

  onRemoveClick(authors: IAuthor[]): void {
    this.authors = [ ...authors ];
  }
}
