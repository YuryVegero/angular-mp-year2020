import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  BreadcrumbComponent,
  LoadingIndicatorComponent,
  NotFoundComponent,
  TextInputComponent,
  DurationInputComponent,
  DateInputComponent,
} from './components';
import { DateInputDirective, HighlightFreshDirective } from './directives';
import { DurationPipe, FilterByPipe, OrderByPipe } from './pipes';
import { TagsControlComponent } from './components/tags-control';
import { TypeaheadComponent } from './components/typeahead';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    HighlightFreshDirective,
    DateInputDirective,
    DurationPipe,
    OrderByPipe,
    FilterByPipe,
    NotFoundComponent,
    LoadingIndicatorComponent,
    TextInputComponent,
    DurationInputComponent,
    DateInputComponent,
    TagsControlComponent,
    TypeaheadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([]),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    LoadingIndicatorComponent,
    TextInputComponent,
    HighlightFreshDirective,
    DurationPipe,
    OrderByPipe,
    FilterByPipe,
    DateInputDirective,
    DurationInputComponent,
    DateInputComponent,
    TagsControlComponent,
    TypeaheadComponent,
  ]
})
export class SharedModule {
}
