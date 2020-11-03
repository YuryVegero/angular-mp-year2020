import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from 'app/auth/auth-routing.module';
import { LoginComponent } from './login';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    FormsModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {
}
