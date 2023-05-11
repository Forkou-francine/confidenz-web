import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ConnexionForm } from 'src/app/classes/connexion-form';
import { first } from 'rxjs/operators';
import { BaseUrl } from 'src/app/classes/base-url';
import { AlertService } from 'src/app/services/alert.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  validationUserForm!: FormGroup;
  connexionForm!: ConnexionForm;
  submitted =false;
  loading =false;

  userInfos: any;
  user: any;
  author: any;

  constructor( private router: Router,
              private logService: LoginService,
              private route: ActivatedRoute,
              public formBuiler: FormBuilder,
              private alertService: AlertService
              ){}


      ngOnInit(){
        this.validationUserForm = this.formBuiler.group({
          email: ['',Validators.compose([ Validators.required,             
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
        });
      }

      get f(){ return this.validationUserForm.controls; }

   onSubmit(){
    this.submitted = true;
    this.alertService.clear();
    console.log(this.f);
    console.log(this.f['email'].value);
    

   if (this.validationUserForm.invalid) {
      return;
    }
    this.loading= true;
    this.logService.login(this.f['email'].value, this.f['password'].value)
    .pipe(first())
    .subscribe({
      next: () => {
        const retunUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.router.navigateByUrl(retunUrl);
        console.log(retunUrl);
        
      },

      error: error => {
        this.alertService.error(error);
        this.loading= false;
      }
    }) 
   }
     
  

      goToRegister(){
        this.router.navigate(['register']);
      }
      goToHome(){
        this.router.navigate(['home']);
      }

}
