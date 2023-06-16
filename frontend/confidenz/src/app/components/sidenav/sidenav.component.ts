import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
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
  users?: any[] ;
  show = false;
  id?:string;

  constructor(   private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService){
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


ngOnInit(){

  this.httpService.getAll()
  .pipe(first())
  .subscribe( (userss: any) => 
   this.users = userss.utilisateur)
   console.log(this.users);

   this.user = this.httpService.userValue;
   if(this.user?.email== 'francineforkou@gmail.com'){
    this.show = true;
   }
   console.log(this.user);
     this.httpService.getAll()
      //  .pipe(first())
       .subscribe( users=> this.users = users);
    
   this.id = this.route.snapshot.params['id'];

  }
}


