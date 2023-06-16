import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';

import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { DetailsComponent } from '../details/details.component';

import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';
import { Users } from 'src/app/classes/users';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { AlertComponent } from '../alert/alert.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const routes: Routes = [
  {
      path: '', component: HomeComponent,
      children: [
          { path: 'details', component: ProfileComponent },
          { path: 'profile/:id', component: ProfileComponent },
          { path: 'register', component: RegisterComponent },

      ]
  },
  { path: 'profile/:id', 
  component: ProfileComponent 
},

];

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{
  users?: any[] ;
  user!: Users | null;
  searchText: any;
  show = false;
  id?:string;
  registrationForm!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
 
  @Input('iduser') iduser: any = 0;

        constructor( private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private httpService: HttpService,
                private alertService: AlertService){
  
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

    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      telephone:['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', Validators.required]
    });

    if (this.id) {
      this.loading= true;
      console.log(this.id);
      
      this.httpService.getById(this.id)
        .pipe(first())
        .subscribe( x => {
          this.registrationForm.patchValue(x);
          this.loading = false;
        });
    }
  }
  



  get f() { return this.registrationForm.controls; }

   onSubmit() {
      this.submitted = true;

      // reset alerts on submit
    this.alertService.clear();

      // stop here if form is invalid
      if (this.registrationForm.invalid) {
          return;
      }

      this.submitting = true;
      this.saveUser().toPromise()
      .then((data) => {
        this.submitting = false;
        this.alertService.success('User saved', { keepAfterRouteChange: true });
        console.log(data);
        this.router.navigateByUrl('/all-users')
        
      }).catch((er) => {
        this.alertService.error(er);
        this.submitting = false;
      })
  }

  private saveUser() {
    return this.id
            ? this.httpService.update(this.id!, this.registrationForm.value)
            : this.httpService.register(this.registrationForm.value);
         
  }

  deleteUser(id: string){
    const user = this.users!.find(x => x.id != id);
    user.isDeleting = true;
    this.alertService.clear();
    this.httpService.delete(id)
    .pipe(first())
    .subscribe(() => this.users = this.users!.filter(x=> x.id !=id));
    this.alertService.success('User deleted successfully', { keepAfterRouteChange: true });
  }




}
