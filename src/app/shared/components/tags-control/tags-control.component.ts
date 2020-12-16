import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface Tag {
  id: string;
  name: string;
}

@Component({
  selector: 'mp-tags-control',
  templateUrl: './tags-control.component.html',
  styleUrls: [ './tags-control.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsControlComponent<T extends Tag> {
  @Input() label = '';
  @Input() tags: T[];
  @Output() tagsChanged = new EventEmitter<T[]>();

  onRemoveClick(tag: T): void {
    const tags = this.tags.filter(({ id }) => id !== tag.id);
    this.tagsChanged.emit(tags);
  }

  trackByTags(index: number, tag: T): string {
    return tag.id;
  }
}
