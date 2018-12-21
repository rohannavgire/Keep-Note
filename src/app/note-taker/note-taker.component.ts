import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { Category } from '../category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

  notes : Note[];
  note : Note;
  categories : Array<Category>;

  errorMessage : string;

  constructor(private noteService:NotesService, private categoryService:CategoryService){

    this.notes = [];
    
    this.note = new Note();

    this.categories = [];

  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data =>{      
      this.categories = data;   
    },error =>{
      
    });
  }

  addNote(){
    try {
    if(!(this.note.noteTitle) || !(this.note.noteContent)) {
      throw new Error('Title and Text both are required fields');
    }
    else {
      if(this.note.category != null) {
        this.note.category.categoryId = this.note.category.id;
      }
    this.notes.push(this.note);
     this.noteService.addNote(this.note).subscribe(addedNote =>{
     
     },error=>{
     //remove from array 
      const index = this.notes.findIndex(note => note.noteTitle == this.note.noteTitle);
      this.notes.splice(index,1);

     if(error.status == 404) {
       this.errorMessage = error.message;
     }
     else {
       this.errorMessage = error.message; 
     }
     });
    }
     this.note = new Note();
  }
  catch (error){
    this.errorMessage = error.message;
  }
   }
}
