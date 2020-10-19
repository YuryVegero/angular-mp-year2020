import { Component, Input } from '@angular/core';

@Component({
  selector: 'mp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() className = 'btn-primary';
}
