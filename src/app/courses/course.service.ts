import { EventEmitter, Injectable } from '@angular/core';
import { Course } from './course.model';
import { courses } from './course.mock';

@Injectable()
export class CourseService {
  public coursesChanged = new EventEmitter<Course[]>();

  private courses: Course[] = [ ...courses ];

  add(course: Course): Course {
    return null;
  }

  get(id): Course {
    return null;
  }

  getAll(): Course[] {
    return [ ...this.courses ];
  }

  update(course: Course): Course {
    return null;
  }

  delete(id): void {
    this.courses = this.courses.filter(course => course.id !== id);
    this.coursesChanged.emit([ ...this.courses ]);
  }
}
