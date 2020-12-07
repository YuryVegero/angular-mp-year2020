import { Component, Input } from '@angular/core';

@Component({
  selector: 'mp-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: [ './loading-indicator.component.scss' ]
})
export class LoadingIndicatorComponent {
  @Input() text = 'Loading ...';
}
