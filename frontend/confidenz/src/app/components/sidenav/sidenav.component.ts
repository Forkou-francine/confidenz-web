import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/classes/users';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  
  user!: Users | null;
  userInfos: any;

  constructor( private httpService: HttpService){
    this.user = this.httpService.userValue;
    console.log(this.user);
    
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
