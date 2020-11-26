import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBreadcrumb } from 'app/shared/components/breadcrumb/breadcrumb.model';

@Component({
  selector: 'mp-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: [ './breadcrumb.component.scss' ]
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() activeLabel = '';

  breadcrumbs: IBreadcrumb[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
    this.setActiveLabel();
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
      label: routeLabel,
      url: nextUrl,
    };
    const nextBreadcrumbs = breadcrumb.label ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs ];

    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, nextUrl, nextBreadcrumbs);
    }
    return nextBreadcrumbs;
  }
}
