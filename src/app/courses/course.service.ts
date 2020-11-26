import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICourse } from './course.model';
import { Observable } from 'rxjs';

@Injectable()
export class CourseService {
  constructor(private http: HttpClient) {
  }

  add(course: ICourse): Observable<ICourse> {
    return this.http.post<ICourse>(`/courses`, course);
  }

  get(id): Observable<ICourse> {
    return this.http.get<ICourse>(`/courses/${id}`);
  }

  getAll(options: any = {}): Observable<ICourse[]> {
    const { term, sort = 'date', count = 5, start = 0 } = options;
    let params = new HttpParams()
      .set('sort', sort)
      .set('start', start)
      .set('count', count);

    if (term) {
      params = params.set('textFragment', term);
    }

    return this.http.get<ICourse[]>(`/courses`, { params });
  }

  update(course: ICourse): Observable<ICourse> {
    return this.http.patch<ICourse>(`/courses/${course.id}`, course);
  }

  delete(id): Observable<ICourse[]> {
    return this.http.delete<ICourse[]>(`/courses/${id}`);
  }
}
