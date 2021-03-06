import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    TranslateModule,
  ],
})
export class AuthModule {
}
