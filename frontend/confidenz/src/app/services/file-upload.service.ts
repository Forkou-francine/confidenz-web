import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { File } from '../classes/file';
import { BaseUrl } from '../classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private fileSubject!: BehaviorSubject<any | null>;
    public file!: Observable<File | null>;

  private baseUrl= "http://localhost:3000/file/save/";
  baseurl = new BaseUrl();

  constructor(private http: HttpClient) { }

    // Returns an observable
    upload(file:any):Observable<any> {

      return this.http.post(this.baseUrl, file)
  }

  getAll(){
    return this.http.get<File[]>(this.baseurl + "file/all/")
  }






}
