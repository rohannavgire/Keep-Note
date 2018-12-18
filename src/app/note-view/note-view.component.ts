import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  notes : Note[];
  constructor(private notesService : NotesService) {
    this.notes = [];       
   }

  ngOnInit() {
    this.notesService.getNotes().subscribe(data =>{
       this.notes = data;       
     },error =>{
       
     });
  }

}
