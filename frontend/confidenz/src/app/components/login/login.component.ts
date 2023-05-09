import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ConnexionForm } from 'src/app/classes/connexion-form';
import { first } from 'rxjs/operators';
import { BaseUrl } from 'src/app/classes/base-url';



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
    this.submitted = true
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
        this.loading= false;
      }
    }) 
   }
     
  
      // loginUser(connexionForm: ConnexionForm){
      //   this.submitted = true
      //   console.log(this.f['email'].value);
      //   console.log(connexionForm);
      //   if (this.validationUserForm.invalid) {
      //         return;
      //       }
      //       this.loading= true;
      //       this.logService.login(connexionForm)
      //       .pipe(first())
      //       .subscribe({
      //         next: () => {
      //           console.log(this.f['email']);
                
      //           const retunUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      //           this.router.navigateByUrl(retunUrl);
      //           console.log(retunUrl);
                
      //         },
        
      //         error: error => {
      //           this.loading= false;
      //         }
      //       }) 
      //   this.logService.login(connexionForm).subscribe((data) => {
      //     this.user = data;
      //       localStorage.setItem("user", JSON.stringify(this.user));
    
      //       // recuperer les infos de l'utilisateur
      //       this.httpService.getInfoUser(this.user.body.email).then((ele: any)=>{
      //         console.log('ele',ele);
      //         this.userInfos = ele
      //         console.log('userInfo',this.userInfos);
      //       this.httpService.setUserInfos(this.userInfos)
      //       })
    
      //       this.router.navigate(['/home'])
          
      //   })
      // }

      // validationUserMessage ={
      //   email:[
      //     {type:"required", message:"Please enter your Email"},
      //     {type:"pattern", message:"The Email entered is Incorrect. Try again"}
      //   ],
      //   password:[
      //     {type:"required", message:"Please enter your password!"},
      //     {type:"minlength", message:"The Password must be at least 5 characters or more"}
      //   ]
      // }

      goToRegister(){
        this.router.navigate(['register']);
      }
      goToHome(){
        this.router.navigate(['home']);
      }

}
