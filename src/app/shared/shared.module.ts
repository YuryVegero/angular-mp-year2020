import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/breadcrumb';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [BreadcrumbComponent, ButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    ButtonComponent,
  ]
})
export class SharedModule {
}
