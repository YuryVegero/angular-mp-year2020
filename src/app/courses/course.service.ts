import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICourse } from './course.model';
import { Observable } from 'rxjs';

@Injectable()
export class CourseService {
  private apiBase = '/api/courses';

  constructor(private http: HttpClient) {
  }

  add(course: ICourse): Observable<ICourse> {
    return this.http.post<ICourse>(this.apiBase, course);
  }

  get(id): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.apiBase}/${id}`);
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

    return this.http.get<ICourse[]>(this.apiBase, { params });
  }

  update(course: ICourse): Observable<ICourse> {
    return this.http.patch<ICourse>(`${this.apiBase}/${course.id}`, course);
  }

  delete(id): Observable<ICourse[]> {
    return this.http.delete<ICourse[]>(`${this.apiBase}/${id}`);
  }
}
