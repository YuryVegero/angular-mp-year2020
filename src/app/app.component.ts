import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth';

@Component({
  selector: 'mp-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
