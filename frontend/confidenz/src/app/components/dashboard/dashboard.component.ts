import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/classes/users';
import { HttpService } from 'src/app/services/http.service';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user!: Users | null;
  userInfos: any;
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File | null = null; // Variable to store file

  constructor( private httpService: HttpService,
              private fileUpload: FileUploadService){
    this.user = this.httpService.userValue;
    console.log(this.user);
    
  }

  ngOnInit(): void {
      
  }

   // On file Select
    onChange(e: Event): void {
      const target = e.target as HTMLInputElement
      this.file = target!.files![0];
  }

  // // OnClick of button Upload
 onUpload() {
    this.loading = !this.loading;
      console.log(this.file);
      const formData = new FormData();
      formData.append('file',this.file!)
      this.fileUpload.upload(formData).subscribe(
        (e: any) => {
          if (typeof (e) === 'object') {
            this.shortLink = e.link;
            this.loading = false; // Flag variable
        }
      }
      );
      console.log(formData);
      
  }



  

onUser(){
  this.httpService.getUserInfos().subscribe((data: any) => {
        this.user = data;
          localStorage.setItem("user", JSON.stringify(this.user));
  
          // recuperer les infos de l'utilisateur
          this.httpService.getUserInfos().then((ele: any)=>{
            console.log('ele',ele);
            this.userInfos = ele
            console.log('userInfo',this.userInfos);
          this.httpService.setUserInfos(this.userInfos)
          })
        
      })
}
}
