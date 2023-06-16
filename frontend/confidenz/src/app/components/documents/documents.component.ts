import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { AlertService } from 'src/app/services/alert.service';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {

  id!:string;
  uploadForm!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  files!: any[] ;
  file: File | null = null; // Variable to store file


  @Input('showModal') showModal = false;
  @Output('onClose') onclose: EventEmitter<any> = new EventEmitter<any>();
  @Input('iduser') iduser: any = 0; 

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private  alertService: AlertService,
    private fileUpload: FileUploadService){}

    ngOnInit() {
      this.fileUpload.getAll()
      .pipe(first())
    .subscribe( (files: any) => {
      this.files = files['fichier']
      console.log("Files received", this.files);
    }
     );
      
      
      this.id = this.route.snapshot.params['id'];
  
      this.uploadForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        creationDate: ['', Validators.required],
      });
  
      if (this.id) {
        this.loading= true;
        console.log(this.id);
        
        this.httpService.getById(this.id)
          .pipe(first())
          .subscribe( x => {
            this.uploadForm.patchValue(x);
            this.loading = false;
          });
      }
        
    }
  
    // onCloseM(): void{
    //   this.onclose.emit('close')
    // }
  
    get f() { return this.uploadForm.controls; }
  
    onSubmit() {
      this.alertService.clear();
        this.submitting = true;
        this.saveUser().toPromise()
        .then((data) => {
          //this.showModal = false;
          this.submitting = false;
          this.alertService.success('User saved', { keepAfterRouteChange: true });
          console.log(data);
          
          //this.router.navigateByUrl('/profile');
        }).catch((er) => {
          this.alertService.error(er);
          this.submitting = false;
        })
    }
  
    private saveUser() {
      this.iduser = this.httpService.userValue?.userId
        // create or update user based on id param
        return  this.httpService.update(this.iduser!, this.uploadForm.value);      
    }

    // On file Select
    onChange(e: Event): void {
      const target = e.target as HTMLInputElement
      this.file = target!.files![0];
  }

  onDelete(fileId: string){
    this.fileUpload.deleteFile(fileId)
    .pipe(first())
    .subscribe( (files: any) => {
      this.files = files['fichier']
      console.log("Files received", this.files);
    }
     );
  }

  onEdit(fileId: string){
    this.fileUpload.getFile(fileId)
    .pipe(first())
    .subscribe((files: any) => {
      this.files = files['fichier']
      this.router.navigate(['/details'])
    })
  }

    onUpload() {
      console.log(this.file);
      this.submitted = true
      const formData = new FormData();
      formData.append('file', this.file!)
      formData.append('name', this.uploadForm.value.name)
      formData.append('description', this.uploadForm.value.description)
      formData.append('userId', this.httpService.userValue?.userId)
      
      this.fileUpload.upload(formData).toPromise()
      .then((res) => {
        this.submitted = false
        console.log(res);
        
      }).catch((err) => {
        this.submitted = false
        console.error(err);
      });
      
      
  }

}
