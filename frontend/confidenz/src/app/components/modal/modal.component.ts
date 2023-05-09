import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { LoginService } from 'src/app/services/login.service';
import { HttpSentEvent } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{

  id?:string;
  modificationForm!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  

  constructor( private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService){

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.modificationForm = this.formBuilder.group({
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

  get f() { return this.modificationForm.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
    //  this.alertService.clear();

      // stop here if form is invalid
      if (this.modificationForm.invalid) {
          return;
      }

      this.submitting = true;
      this.saveUser()
          .pipe(first())
          .subscribe({
              next: () => {
                  // this.alertService.success('User saved', { keepAfterRouteChange: true });
                  this.router.navigateByUrl('/profile');
              },
              error: error => {
                  // this.alertService.error(error);
                  this.submitting = false;
              }
          })
  }

  private saveUser() {
      // create or update user based on id param
      return this.id
          ? this.httpService.update(this.id!, this.modificationForm.value)
          : this.httpService.register(this.modificationForm.value);
  }
}
