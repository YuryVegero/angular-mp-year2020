import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth';
import { CoreModule } from './core';
import { CoursesModule } from './courses';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    CoursesModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
