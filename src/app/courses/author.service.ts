import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthor } from 'app/courses/author.model';

@Injectable()
export class AuthorService {
  constructor(private http: HttpClient) {
  }

  getAll(textFragment): Observable<IAuthor[]> {
    let params = new HttpParams();
    if (textFragment) {
      params = params.set('textFragment', textFragment);
    }
    return this.http.get<IAuthor[]>(`/api/authors`, { params });
  }
}
