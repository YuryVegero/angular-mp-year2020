import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'app/courses/course.model';

@Component({
  selector: 'mp-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent {
  @Input() course: Course;
  @Output() courseDelete = new EventEmitter<Course>();
  @Output() courseEdit = new EventEmitter<Course>();

  onDeleteClick(): void {
    this.courseDelete.emit(this.course);
  }

  onEditClick(): void {
    this.courseEdit.emit(this.course);
  }
}
