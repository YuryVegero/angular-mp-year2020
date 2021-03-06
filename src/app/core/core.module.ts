import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header';
import { FooterComponent } from './components/footer';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `${CoreModule.name} has already been loaded. Import the module in the AppModule only.`
      );
    }
  }
}
