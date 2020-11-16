import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/breadcrumb';
import { ButtonComponent } from './components/button/button.component';
import { HighlightFreshDirective } from './directives/highlight-fresh.directive';
import { DateInputDirective } from './directives/date-input.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterByPipe } from './pipes/filter-by.pipe';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    ButtonComponent,
    HighlightFreshDirective,
    DateInputDirective,
    DurationPipe,
    OrderByPipe,
    FilterByPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    ButtonComponent,
    HighlightFreshDirective,
    DurationPipe,
    OrderByPipe,
    FilterByPipe,
    DateInputDirective,
  ]
})
export class SharedModule {
}
