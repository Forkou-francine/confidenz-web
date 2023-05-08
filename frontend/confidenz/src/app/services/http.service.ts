import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '../classes/base-url';
//import {element} from 'protractor'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = new BaseUrl();
  userInfos:  any;

  constructor( private http: HttpClient) {
   }

   async getInfoUser(email:String) {
    return this.http.get(this.baseUrl.url + "user/i" + email, this.baseUrl.httpOptions).toPromise()
  }


   setUserInfos(data: any){
    this.userInfos = data;
   }

   getUserInfos(){
    return this.userInfos;
   }
}
