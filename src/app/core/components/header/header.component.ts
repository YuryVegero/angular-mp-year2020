import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'app/auth';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mp-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private routerSub: Subscription;
  private userSub: Subscription;

  authenticated$: Observable<boolean>;
  userLogin = '';
  authBlockVisible = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authBlockVisible = this.checkAuthBlockVisible(router.url);

    this.routerSub = router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.authBlockVisible = this.checkAuthBlockVisible(event.url);
      }
    });

    this.authenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user) => {
      this.userLogin = user.login;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  private checkAuthBlockVisible(currentUrl): boolean {
    const authHiddenUrls = [ '/login' ];
    return !authHiddenUrls.includes(currentUrl);
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
