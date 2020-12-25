import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBreadcrumb } from 'app/shared/components/breadcrumb/breadcrumb.model';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mp-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: [ './breadcrumb.component.scss' ]
})
export class BreadcrumbComponent implements OnInit, OnChanges, OnDestroy {
  private langSub: Subscription;

  @Input() activeLabel = '';

  breadcrumbs: IBreadcrumb[] = [];

  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
    this.setActiveLabel();

    this.langSub = this.translateService.onLangChange
      .subscribe((event: LangChangeEvent) => {
        this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
        this.setActiveLabel();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setActiveLabel();
  }

  setActiveLabel(): void {
    if (this.activeLabel && this.breadcrumbs?.length) {
      this.breadcrumbs[this.breadcrumbs.length - 1].label = this.activeLabel;
    }
  }

  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const routeLabel = route.routeConfig?.data?.breadcrumb ?? '';
    const routeUrl: string = route.snapshot.url.map((segment) => segment.path).join('/');

    const nextUrl = routeUrl ? `${url}/${routeUrl}` : url;

    const breadcrumb: IBreadcrumb = {
      label: routeLabel ? this.translateService.instant(routeLabel) : routeLabel,
      url: nextUrl,
    };
    const nextBreadcrumbs = breadcrumb.label ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs ];

    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, nextUrl, nextBreadcrumbs);
    }
    return nextBreadcrumbs;
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }
}
