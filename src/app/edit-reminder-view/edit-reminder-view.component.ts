import { Component, Inject, Input, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Category } from '../category';
import { ReminderService } from '../services/reminder.service';
import { Reminder } from '../reminder';

@Component({
  selector: 'app-edit-reminder-view',
  templateUrl: './edit-reminder-view.component.html',
  styleUrls: ['./edit-reminder-view.component.css']
})
export class EditReminderViewComponent implements OnInit {

  notes : Note[];
  filterNotes : Note[];
  filterReminders : Reminder[];
  reminder: Reminder;
  remId : string;
  reminders: Array<Reminder> = [];
  errMessage: string;


  constructor(private notesService: NotesService, private remService: ReminderService, public dialogRef: MatDialogRef<EditReminderViewComponent>,
    @Inject(MAT_DIALOG_DATA) public reminderId: any) { 
      this.remId = reminderId;
      this.filterNotes = [];
      this.filterReminders = [];
      this.notesService.getNotes().subscribe(res => {
        this.notes = res;        
      }

      )
      this.remService.getReminderById(reminderId).subscribe(res => {
        this.reminder = res;     
      },
    error=> {
      if(error.status == 404) {
        this.errMessage = error.message;
      }
      else {
        this.errMessage = error.message;
      }
    });
    }

    ngOnInit() {
      // this.catService.getCategories().subscribe(data =>{
      //    this.categories = data;       
      //  },error =>{
         
      //  });
    }

  onSave() {
    this.remService.editReminder(this.reminder).subscribe(res => {
        
      this.filterNotes = this.notes.filter(note => note.reminders.find(function(element) {
        return element.reminderId == res.reminderId;
      }));       

      this.filterNotes.forEach(note => {        
        
        note.reminders.forEach(reminder => {          
          
          if(reminder.reminderId == this.remId) {
            note.reminders.splice(note.reminders.indexOf(reminder),1,res);
          }
        })
        this.notesService.editNote(note).subscribe(res => {
        }  
        )
    })      
      
    },
  error=> {
    if(error.status == 404) {
      this.errMessage = error.message;
    }
    else {
      this.errMessage = error.message;
    }
  });
    this.dialogRef.close();
  }

}
