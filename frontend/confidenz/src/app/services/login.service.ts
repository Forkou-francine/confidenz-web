import { Injectable } from '@angular/core';
import { BaseUrl } from '../classes/base-url';

import { environment } from 'src/environments/environment';
import { ConnexionForm } from '../classes/connexion-form';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable } from 'rxjs';

import {map} from 'rxjs/operators'
import { Users } from '../classes/users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  private userSubject!: BehaviorSubject<Users | null>;
    public user: Observable<Users | null>;
  

  
  constructor( private http: HttpClient,
              private router: Router) {

                this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
                this.user = this.userSubject.asObservable();
   }

   public get userValue(){
    return this.userSubject.value;
   }


login(email: string, password: string) {
  return this.http.post<Users>(`${environment.apiUrl}/user/login/`, { email, password })
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user; 
      }));
}

logout() {
  // remove user from local storage and set current user to null
  localStorage.removeItem('user');
  this.userSubject.next(null);
  this.router.navigate(['/components/login']);
}





}
