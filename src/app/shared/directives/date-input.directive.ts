import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';

@Directive({
  selector: '[mpDateInput]',
  providers: [ DatePipe ],
})
export class DateInputDirective implements OnChanges {
  @Input('mpDateInput') date: Date;
  @Output('mpDateInputChange') onDateInput = new EventEmitter();

  constructor(
    private element: ElementRef,
    private datePipe: DatePipe,
  ) {
  }

  ngOnChanges({ date }: SimpleChanges): void {
    this.render(date.currentValue);
  }

  @HostListener('input') onKeyUp(): void {
    this.updateDate();
  }

  private render(date: Date): void {
    this.element.nativeElement.value = date ? this.datePipe.transform(date, 'yyyy-MM-dd') : '';
  }

  private updateDate(): void {
    const dataStr = this.element.nativeElement.value;
    const date = isNaN(Date.parse(dataStr)) ? null : new Date(dataStr);
    this.onDateInput.emit(date);
  }
}
