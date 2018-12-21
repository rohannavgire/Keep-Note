import { Component, Inject, Input, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Category } from '../category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  categories: Array<Category> = [];
  errMessage: string;


  constructor(private notesService: NotesService, private catService: CategoryService, public dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public noteId: any) { 
      this.catService.getCategories().subscribe(data =>{
        this.categories = data;       
      },error =>{
        
      });

      this.note = this.notesService.getNoteById(noteId); 
    }

    ngOnInit() {
      // this.catService.getCategories().subscribe(data =>{
      //    this.categories = data;       
      //  },error =>{
         
      //  });
    }

  onSave() {
    if(this.note.category.categoryId) {
      this.note.category.id = this.note.category.categoryId;
    }
    else if(this.note.category.id) {
      this.note.category.categoryId = this.note.category.id;
    }
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
