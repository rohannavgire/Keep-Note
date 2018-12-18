import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  notes : Array<Note>;
  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  constructor(private notesService : NotesService) {
    this.notes = [];       
   }

  ngOnInit() {    
      this.notesService.getNotes().subscribe(data =>{
       this.notes = data;
       this.notStartedNotes = data.filter(data => data.noteStatus == 'not-started');
       this.startedNotes = data.filter(data => data.noteStatus == 'started');
       this.completedNotes = data.filter(data => data.noteStatus == 'completed');
     },error =>{
       
     });
  }

}
