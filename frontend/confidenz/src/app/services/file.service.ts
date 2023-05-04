import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentsComponent } from '../components/documents/documents.component';
import { BaseUrl } from '../classes/base-url';

const api = '/api';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor( private http: HttpClient ) { }


  getFiles(){

  }
}
