import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  constructor(private http: HttpClient) {}

  getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>('/api/links/');
  }

  postLinks(link: Link): Observable<Link> {
    return this.http.post<Link>('/api/links/', link);
  }
}

export interface Link {
  name: string;
  title: string;
  url: string;
  _id?: string;
}
