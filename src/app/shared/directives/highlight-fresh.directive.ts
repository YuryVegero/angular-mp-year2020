import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[mpHighlightFresh]'
})
export class HighlightFreshDirective implements OnInit {
  @Input('mpHighlightFresh') date: Date;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.highlight();
  }

  private highlight(): void {
    const currentMs = Date.now();
    const dateMs = this.date.getTime();
    const twoWeeksMs = 14 * (1000 * 60 * 60 * 24);

    if (dateMs > currentMs) {
      this.el.nativeElement.style.border = '2px solid blue';
    } else {
      if (currentMs - dateMs <= twoWeeksMs) {
        this.el.nativeElement.style.border = '2px solid green';
      }
    }
  }

}
