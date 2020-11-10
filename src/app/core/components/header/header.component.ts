import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'app/auth';

@Component({
  selector: 'mp-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {
  userLogin = '';
  authenticated = false;
  authBlockVisible = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authBlockVisible = this.checkAuthBlockVisible(router.url);

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.authBlockVisible = this.checkAuthBlockVisible(event.url);
      }
    });
  }

  ngOnInit(): void {
    this.authenticated = this.authService.isAuthenticated();
    this.userLogin = this.authService.getCurrentUser()?.email;

    this.authService.userChanged
      .subscribe((user) => {
        this.authenticated = this.authService.isAuthenticated();
        this.userLogin = user?.email;
      });
  }

  logout(): void {
    this.authService.logout();
  }

  private checkAuthBlockVisible(currentUrl): boolean {
    const authHiddenUrls = [ '/login' ];
    return !authHiddenUrls.includes(currentUrl);
  }
}
