import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  enteredValue1 = '';
  newName = 'No Modification';

  enteredValue2 = '';
  newEmail = 'No Modification';

  enteredValue3 = '';
  newNumber = 'No Modification';

  enteredValue4 = '';
  newPassword = 'No Modification';


  onEdit(){
    this.newName = this.enteredValue1;
    this.newEmail = this.enteredValue2;
    this.newNumber = this.enteredValue3;
    this.newPassword = this.enteredValue4;

  }



  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
