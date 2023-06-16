import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HttpService } from 'src/app/services/http.service';
import { File } from 'src/app/classes/file';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  files!: any[] ;
  file: File | null = null; // Variable to store file
  headers!: any[];


  constructor( private fileUpload: FileUploadService,
            private http: HttpService,
            private route: ActivatedRoute) {
  }

  ngOnInit(fileId: string) {
   // this.fileUpload.getHeaders().subscribe(headers => {
    //  this.headers = headers;
  //    });
      
    this.fileUpload.getFile(fileId)
    .pipe((first()))
  .subscribe( (files: any) => {
    this.files = files['fichier'];
    this.file = files['fichier']
    console.log("Files received", this.files);
    console.log("HELLLLOOOOO");
    
  }
   );
}
}