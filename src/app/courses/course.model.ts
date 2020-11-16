export interface ICourse {
  id?: string;
  title: string;
  createdAt: Date;
  duration: number;
  description: string;
  authors: string;
  topRated?: boolean;
}

export class Course implements ICourse {
  createdAt: Date;
  id?: string;
  title: string;
  duration: number;
  description: string;
  authors: string;
  topRated?: boolean;

  constructor(course: ICourse) {
    this.id = course.id;
    this.title = course.title;
    this.createdAt = course.createdAt;
    this.duration = course.duration;
    this.description = course.description;
    this.authors = course.authors;
    this.topRated = course.topRated;
  }
}
