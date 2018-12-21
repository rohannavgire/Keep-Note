import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  categoryId: string;
  notes : Note[];
  filterNotes : Note[];
  constructor(private notesService : NotesService, private activatedRoute: ActivatedRoute) {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');
    console.log("Cat Viewss: ",this.categoryId);
    activatedRoute.params.subscribe(val => {
      
      this.categoryId = val.categoryId;
      
      if(!this.categoryId) {
        console.log("Inside no cat: ",this.categoryId);
        this.notesService.getNotes().subscribe(data =>{
          this.notes = data;       
        },error =>{
        });
      }
      else {
        console.log("Inside yes cat: ",this.categoryId);
        this.notesService.getNotes().subscribe(data =>{
          this.filterNotes = data;
          this.notes = this.filterNotes.filter(note => note.category.categoryId == this.categoryId);
          console.log("Filter notes: ", this.notes);        
        },error =>{
        });
      }
    });
    // this.notes = [];       
   }

  ngOnInit() {
    console.log("Final notes: ", this.notes);
    
    // if(!this.categoryId) {
    //   console.log("Inside no cat: ",this.categoryId);
    //   this.notesService.getNotes().subscribe(data =>{
    //     this.notes = data;       
    //   },error =>{
    //   });
    // }
    // else {
    //   console.log("Inside yes cat: ",this.categoryId);
    //   this.notesService.getNotes().subscribe(data =>{
    //     this.filterNotes = data;
    //     this.notes = this.filterNotes.filter(note => note.category.categoryId == this.categoryId);
    //     console.log("Filter notes: ", this.notes);        
    //   },error =>{
    //   });
    // }
  }

}
