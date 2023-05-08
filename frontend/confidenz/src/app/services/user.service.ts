import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Users } from '../classes/users';
import { BaseUrl } from '../classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = BaseUrl;
 // private users$ = Subject<Users[]> = new Subject();

  constructor( private http: HttpClient ) { }
}
