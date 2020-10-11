export interface ICourse {
  id: string;
  title: string;
  createdAt: Date;
  duration: number;
  description: string;
}

export class Course implements ICourse {
  createdAt: Date;
  id: string;
  title: string;
  duration: number;
  description: string;

  constructor(course: ICourse) {
    this.id = course.id;
    this.title = course.title;
    this.createdAt = course.createdAt;
    this.duration = course.duration;
    this.description = course.description;
  }
}
