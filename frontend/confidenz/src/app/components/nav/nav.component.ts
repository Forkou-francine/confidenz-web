import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

import { Users } from 'src/app/classes/users';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  user?: Users | null;

  constructor( private logService: LoginService){
    this.logService.user.subscribe( x=> this.user = x);
  }

  logout(){
    this.logService.logout();
  }
}
