import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { AlertService } from 'src/app/services/alert.service';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.css']
})
export class MyDocumentsComponent implements OnInit {


  files?: any[] ;
  file: File | null = null; // Variable to store file

  constructor( private httpService: HttpService,
    private  alertService: AlertService,
    private fileUpload: FileUploadService){}
  ngOnInit(): void {
    this.fileUpload.getFilesByUser(this.httpService.userValue?.userId)
    .pipe()
    .subscribe(
      (files: any) => {
        this.files = files['files']
        console.log("Files received", this.files);
      }
    )
  }

  onDelete(){}

  onChange(){}

  onDownload(){}

 

}
