import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[mpHighlightFresh]'
})
export class HighlightFreshDirective implements OnInit {
  @Input('mpHighlightFresh') date: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.highlight();
  }

  private highlight(): void {
    const currentMs = Date.now();
    const dateMs = new Date(this.date).getTime();
    const twoWeeksMs = 14 * (1000 * 60 * 60 * 24);

    if (dateMs > currentMs) {
      this.el.nativeElement.classList.add('mp-highlight--future');
    } else {
      if (currentMs - dateMs <= twoWeeksMs) {
        this.el.nativeElement.classList.add('mp-highlight--new');
      }
    }
  }

}
