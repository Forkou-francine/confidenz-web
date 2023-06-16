import { Component, EventEmitter, Input, OnInit, Output, importProvidersFrom } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { LoginService } from 'src/app/services/login.service';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{

  id?:string;
  modificationForm!: FormGroup;
  registrationForm!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  @Input('showModal') showModal = false;
  @Output('onClose') onclose: EventEmitter<any> = new EventEmitter<any>();
  @Input('iduser') iduser: any = 0;
  

  constructor( private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private alertService: AlertService){

  }

  ngOnInit() {
    // this.iduser = this.httpService.userValue?.userId
    // console.log(this.iduser);
    
    this.id = this.route.snapshot.params['id'];

    this.modificationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      telephone:['', Validators.required],
      email: ['', Validators.required]
    });

    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      telephone:['', Validators.required],
      email: ['', Validators.required]
    });

    if (this.id) {
      this.loading= true;
      console.log(this.id);
      
      this.httpService.getById(this.id)
        .pipe(first())
        .subscribe( x => {
          this.modificationForm.patchValue(x);
          this.loading = false;
        });
    }
      
  }

  onCloseM(): void{
    this.onclose.emit('close')
  }

  get f() { return this.modificationForm.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
    this.alertService.clear();

      // stop here if form is invalid
      if (this.modificationForm.invalid) {
          return;
      }

      this.submitting = true;
      this.saveUser().toPromise()
      .then((data) => {
        this.showModal = false;
        this.submitting = false;
        this.alertService.success('User updated', { keepAfterRouteChange: true });
        console.log(data);
        
        //this.router.navigateByUrl('/profile');
      }).catch((er) => {
        this.alertService.error(er);
        this.submitting = false;
      })
  }

  
  onRegister() {
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
      this.showModal = false;
      this.submitting = false;
      this.alertService.success('User saved', { keepAfterRouteChange: true });
      console.log(data);
      
      this.router.navigateByUrl('/all-users');
    }).catch((er) => {
      this.alertService.error(er);
      this.submitting = false;
    })
}

  private saveUser() {
    this.iduser = this.httpService.userValue?.userId

      // create or update user based on id param
      return  this.httpService.update(this.iduser!, this.modificationForm.value);
         
  }
}
