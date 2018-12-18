import { Component, Inject, Input } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;


  constructor(private notesService: NotesService, public dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public noteId: any) { 
      this.note = this.notesService.getNoteById(noteId);      
    }

  ngOnInit() {
  }

  onSave() {
    this.notesService.editNote(this.note).subscribe(res => {      
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
