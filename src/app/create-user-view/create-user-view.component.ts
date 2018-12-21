import { Component, Inject, Input, OnInit } from '@angular/core';
import { User } from '../user';
import { NotesService } from '../services/notes.service';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-create-user-view',
  templateUrl: './create-user-view.component.html',
  styleUrls: ['./create-user-view.component.css']
})
export class CreateUserViewComponent implements OnInit {

  user : User;
  errMessage: string;


  constructor(private userService: UserService, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<CreateUserViewComponent>) {       

      this.user = new User();
    }

    ngOnInit() {

    }

  onSave() {    
    this.userService.addUser(this.user).subscribe(res => {      
    },
  error=> {
    if(error.status == 409) {
      this.snackBar.open("User with this User ID already exists. Try again.", null, {
        duration: 2000,
      });      
      this.errMessage = error.message;
    }
    else {
      this.errMessage = error.message;
    }
  });
    this.dialogRef.close();
  }

}
