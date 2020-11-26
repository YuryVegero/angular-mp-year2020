import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    FormsModule,
    CommonModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {
}
