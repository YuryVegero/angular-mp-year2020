import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'app/courses/course.model';

@Component({
  selector: 'mp-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: [ './course-item.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent {
  @Input() course: Course;
  @Output() courseDelete = new EventEmitter<Course>();
  @Output() courseEdit = new EventEmitter<Course>();

  onDeleteClick(event: MouseEvent): void {
    this.courseDelete.emit(this.course);
    event.preventDefault();
  }
}
