import {
  ChangeDetectionStrategy,
  Component,
  Renderer2,
  ViewChild,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output, ChangeDetectorRef
} from '@angular/core';
import { debounceTime, distinctUntilChanged, map, pluck } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'mp-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: [ './typeahead.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeaheadComponent<T> implements OnInit, OnDestroy {
  private inputSub: Subscription;
  private inputSubject$ = new Subject<KeyboardEvent>();

  @Input() label = '';
  @Input() items: T[];
  @Output() itemChanged = new EventEmitter<string>();
  @Output() itemSelected = new EventEmitter<T>();

  @ViewChild('input') inputRef: ElementRef;
  @ViewChild('menu') menuRef: ElementRef;

  isOpen = false;
  text = '';

  constructor(
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.inputSub = this.inputSubject$.pipe(
      pluck<KeyboardEvent, string>('target', 'value'),
      map(text => text?.trim()),
      debounceTime(200),
      distinctUntilChanged(),
    ).subscribe((text) => {
      this.itemChanged.emit(text);
    });

    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.inputRef.nativeElement && e.target !== this.menuRef?.nativeElement) {
        this.isOpen = false;
        this.changeDetector.markForCheck();
      }
    });
  }

  onFocus(): void {
    this.isOpen = true;
  }

  onKeyUp(event: KeyboardEvent): void {
    this.inputSubject$.next(event);
  }

  onItemClick(item: T): void {
    this.itemSelected.emit(item);
    this.isOpen = false;
    this.text = '';
  }

  ngOnDestroy(): void {
    this.inputSub.unsubscribe();
  }
}
