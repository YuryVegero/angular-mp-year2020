import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { LogoComponent } from './header/logo';
import { UserAuthComponent } from './header/user-auth';
import { AuthModule } from 'app/auth/auth.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    UserAuthComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule {
}
