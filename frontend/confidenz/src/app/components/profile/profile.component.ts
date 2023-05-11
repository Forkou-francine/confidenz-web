import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Users } from 'src/app/classes/users';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: Users | null;
  users?: any[];
  email?: string;
  showModal = false;

  constructor( private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute){
    
  }

  ngOnInit() {
    this.user = this.httpService.userValue;
    console.log(this.user);
      this.httpService.getAll()
        .pipe(first())
        .subscribe( users=> this.users = users);
  }
  
}
