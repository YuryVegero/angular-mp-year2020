import { Component } from '@angular/core';

@Component({
  selector: 'mp-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent {
  onClick(): void {
    console.log('clicked');
  }
}
