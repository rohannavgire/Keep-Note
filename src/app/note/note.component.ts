import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import { Category } from '../category';
import { Reminder } from '../reminder';
import { ReminderService } from '../services/reminder.service';
import {MatChipsModule} from '@angular/material/chips';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

@Input()
note : Note;

updatedNote : Note;
category : Category;
reminders : Reminder[];
reminder : Reminder;
errMessage: string;
visible = true;
selectable = true;
removable = true;
addOnBlur = true;
readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(private router: RouterService, private reminderService: ReminderService, private notesService: NotesService) {
    this.updatedNote = new Note();         
    this.reminder = new Reminder();
   }

  ngOnInit() {
    this.updatedNote = this.note;
    this.reminders = this.note.reminders;
    this.category = this.note.category;
  }

  openEditNoteView() {    
    this.router.routeToEditNoteView(this.note.noteId);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our reminder
    if ((value || '').trim()) {
      console.log("New rem name: ", value);
      
      this.reminder.reminderName = value.trim();
      this.reminderService.addReminder(this.reminder).subscribe(res => {
        
        this.updatedNote.reminders.push(res);
        this.notesService.editNote(this.updatedNote).subscribe(res => {      
        },
      error=> {
        if(error.status == 404) {
          this.errMessage = error.message;
        }
        else {
          this.errMessage = error.message;
        }
      });

      // this.reminders.push(res);  
      
      },
    error=> {
      if(error.status == 404) {
        this.errMessage = error.message;
      }
      else {
        this.errMessage = error.message;
      }
    });
      // this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  // remove(fruit: Fruit): void {
  //   const index = this.fruits.indexOf(fruit);

  //   if (index >= 0) {
  //     this.fruits.splice(index, 1);
  //   }
  // }

}
