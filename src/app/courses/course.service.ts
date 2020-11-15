import { EventEmitter, Injectable } from '@angular/core';
import { Course } from './course.model';
import { courses } from './course.mock';

@Injectable()
export class CourseService {
  public coursesChanged = new EventEmitter<Course[]>();

  private courses: Course[] = [ ...courses ];

  add(course: Course): Course {
    const newCourse: Course = { ...course, id: `${Date.now()}` };
    this.courses = [ ...this.courses, newCourse ];
    this.coursesChanged.emit([ ...this.courses ]);
    return newCourse;
  }

  get(id): Course {
    return this.courses.find((course) => course.id === id);
  }

  getAll(): Course[] {
    return [ ...this.courses ];
  }

  update(course: Course): Course {
    const index = this.courses.findIndex(courseItem => courseItem.id === course.id);
    const newCourse: Course = { ...this.courses[index], ...course };
    this.courses.splice(index, 1, newCourse);
    this.courses = [ ...this.courses ];
    this.coursesChanged.emit([ ...this.courses ]);
    return newCourse;
  }

  delete(id): void {
    this.courses = this.courses.filter(course => course.id !== id);
    this.coursesChanged.emit([ ...this.courses ]);
  }
}
