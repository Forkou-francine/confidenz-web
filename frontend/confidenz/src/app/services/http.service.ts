import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '../classes/base-url';
import { LoginService } from './login.service';

import { environment } from 'src/environments/environment';
import {BehaviorSubject, Observable } from 'rxjs';

import {map} from 'rxjs/operators'
import { Users } from '../classes/users';
import { Router } from '@angular/router';

//import {element} from 'protractor'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = new BaseUrl();
  userInfos:  any;
 private userSubject!: BehaviorSubject<any | null>;
    public user: Observable<Users | null>;
  

  
  constructor( private http: HttpClient,
              private router: Router,
              private logService: LoginService) {

                this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
                this.user = this.userSubject.asObservable();
   }

   public get userValue(){
    return this.userSubject.value;
   }

   async getInfoUser(email:String,) {
    return this.http.get(this.baseUrl.url + "user/" + email, this.baseUrl.httpOptions).toPromise()
  }


  getAll(){
    return this.http.get<Users[]>(this.baseUrl.url + "user/all/")
  }

  getById(id: string) {
    return this.http.get<Users>(`${environment.apiUrl}/user/${id}`);
}
  

  getUserByEmail(email: string){
    return this.http.get<Users>(`${environment.apiUrl}/user/${email}`)
  }

   setUserInfos(data: any){
    this.userInfos = data;
   }

   getUserInfos(){
    return this.userInfos;
   }


   update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/user/update/${id}`, params)
        .pipe(map(x => {
            // update stored user if the logged in user updated their own record
            if (id == this.userValue?.id) {
                // update local storage
                const user = { ...this.userValue, ...params };
                localStorage.setItem('user', JSON.stringify(user));
                console.log(user);
                
                // publish updated user to subscribers
                this.userSubject.next(user);
            }
            return x;
        }));
}

delete(id: string){
  return this.http.delete(`${environment.apiUrl}/user/delete/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                // if (id == this.userValue?.id) {
                //     this.logService.logout();
                // }
                return x;
            }));
}

register(user: Users) {
  return this.http.post(`${environment.apiUrl}/user/register`, user);
}
}
