import { IAuthor } from 'app/courses/author.model';

export interface ICourse {
  id?: string;
  name: string;
  date: string;
  length: number;
  description: string;
  authors: IAuthor[];
  isTopRated?: boolean;
}

export class Course implements ICourse {
  date: string;
  id?: string;
  name: string;
  length: number;
  description: string;
  authors: IAuthor[];
  isTopRated?: boolean;

  constructor(course: ICourse) {
    this.id = course.id;
    this.name = course.name;
    this.date = course.date;
    this.length = course.length;
    this.description = course.description;
    this.authors = course.authors;
    this.isTopRated = course.isTopRated;
  }
}
