import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl= "http://localhost/3000/file/save";

  constructor(private http: HttpClient) { }

    // Returns an observable
    upload(file:any):Observable<any> {

      return this.http.post(this.baseUrl, file,  {
        headers: {
          'Content-Type': 'multiport/form-data' ,

        }
      })
  }





}
