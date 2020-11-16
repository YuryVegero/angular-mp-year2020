import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent, NotFoundComponent } from './components';
import { DateInputDirective, HighlightFreshDirective } from './directives';
import { DurationPipe, FilterByPipe, OrderByPipe } from './pipes';


@NgModule({
  declarations: [
    BreadcrumbComponent,
    HighlightFreshDirective,
    DateInputDirective,
    DurationPipe,
    OrderByPipe,
    FilterByPipe,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([]),
  ],
  exports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    HighlightFreshDirective,
    DurationPipe,
    OrderByPipe,
    FilterByPipe,
    DateInputDirective,
  ]
})
export class SharedModule {
}
