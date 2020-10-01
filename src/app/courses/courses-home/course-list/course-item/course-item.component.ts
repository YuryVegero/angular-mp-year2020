import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'app/courses/course.model';

@Component({
  selector: 'mp-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent {
  @Input() course: Course;
  @Output() courseDelete = new EventEmitter<any>();
  @Output() courseEdit = new EventEmitter<any>();

  getDate(): string { // TODO replace with Pipe
    const {createdAt} = this.course;
    return [
      createdAt.getDate(),
      createdAt.getDay(),
      createdAt.getFullYear(),
    ].join('/');
  }

  onDeleteClick(): void {
    this.courseDelete.emit();
  }

  onEditClick(): void {
    this.courseEdit.emit();
  }
}
