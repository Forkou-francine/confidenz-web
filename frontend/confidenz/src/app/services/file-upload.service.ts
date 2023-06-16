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
  private apiUrl = 'http://localhost:3000/headers';


  constructor(private http: HttpClient) { }

    // Returns an observable
    upload(file:any):Observable<any> {

      return this.http.post(this.baseUrl, file)
  }

  getAll(){
    return this.http.get(this.baseurl.url + "file/all/")
  }

  getFilesByUser(id: string){
    return this.http.get(this.baseurl.url + "file/user/" +id);
  }

  deleteFile(id: string){
    return this.http.delete(this.baseurl.url + "file/"+ id, this.baseurl.httpOptions);
  }

  updateFile(id: string){
    return this.http.put(this.baseurl.url + "file/edit/"+ id, this.baseurl.httpOptions);
  }

  getFile(id: string){
    return this.http.get(this.baseurl.url + "file/" +id, this.baseurl.httpOptions)
  }


  getHeaders() {
    return this.http.get(this.apiUrl);
    }
    



}
