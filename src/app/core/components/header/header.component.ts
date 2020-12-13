import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.reducer';
import { logout } from 'app/auth/store/auth.actions';
import { selectUser } from 'app/auth/store/auth.selectors';

@Component({
  selector: 'mp-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnDestroy {
  private routerSub: Subscription;

  authBlockVisible = true;
  user$ = this.store.select(selectUser);

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.authBlockVisible = this.checkAuthBlockVisible(router.url);

    this.routerSub = router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.authBlockVisible = this.checkAuthBlockVisible(event.url);
      }
    });
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  private checkAuthBlockVisible(currentUrl): boolean {
    const authHiddenUrls = [ '/login' ];
    return !authHiddenUrls.includes(currentUrl);
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}
