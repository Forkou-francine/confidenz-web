import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { DetailsComponent } from '../details/details.component';

import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';
import { HttpService } from 'src/app/services/http.service';
import { Users } from 'src/app/classes/users';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { AlertComponent } from '../alert/alert.component';

const routes: Routes = [
  {
      path: '', component: HomeComponent,
      children: [
          { path: 'details', component: ProfileComponent },
          { path: 'profile/:id', component: ProfileComponent },
          { path: 'register', component: RegisterComponent },

      ]
  }
];

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{
  users?: any[] ;
  searchText: any;

  constructor( private logServive: LoginService,
              private httpService: HttpService,
              private alertService: AlertService){}


  ngOnInit(){
    this.httpService.getAll()
    .pipe(first())
    .subscribe( (userss: any) => 
     this.users = userss.utilisateur)
     console.log(this.users);
      
  }

  deleteUser(id: string){
    const user = this.users!.filter(x => x.id != id);
    //user.isDeleting = true;
    this.alertService.clear();
    this.httpService.delete(id)
    .pipe(first())
    .subscribe(() => this.users = this.users!.filter(x=> x.id !=id));
    this.alertService.success('User deleted successfully', { keepAfterRouteChange: true });
  }

  saveUser(use: Users){
    //const user = this.users!.filter(x => x.id != id);
    this.alertService.clear();
    //user.isDeleting = true;
    // this.httpService.register(use)
    // .pipe(first())
   // .subscribe(() => this.users = this.users!.filter(x=> x.id !=id
   this.alertService.success('User deleted successfully', { keepAfterRouteChange: true })
  }






}
