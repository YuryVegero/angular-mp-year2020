import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './components/breadcrumb';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BreadcrumbComponent,
  ]
})
export class SharedModule {
}
