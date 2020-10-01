import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() className = 'btn-primary';
  @Output() clicked = new EventEmitter<MouseEvent>();

  onClickButton(event): void {
    this.clicked.emit(event);
  }
}
