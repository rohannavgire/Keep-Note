import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  categoryId: string;
  filterNotes : Note[];
  notes : Array<Note>;
  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  constructor(private notesService : NotesService, private activatedRoute: ActivatedRoute) {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');
    activatedRoute.params.subscribe(val => {
      
      this.categoryId = val.categoryId;
      
      if(!this.categoryId) {
        this.notesService.getNotes().subscribe(data =>{
          this.notes = data;
          this.notStartedNotes = data.filter(data => data.noteStatus == 'not-started');
          this.startedNotes = data.filter(data => data.noteStatus == 'started');
          this.completedNotes = data.filter(data => data.noteStatus == 'completed');
        },error =>{
          
        });
      }
      else {
        this.notesService.getNotes().subscribe(data =>{
          this.filterNotes = data;
          this.filterNotes = this.filterNotes.filter(note => note.category != null);
          this.notes = this.filterNotes.filter(note => note.category.categoryId == this.categoryId);
          this.notStartedNotes = this.notes.filter(data => data.noteStatus == 'not-started');
          this.startedNotes = this.notes.filter(data => data.noteStatus == 'started');
          this.completedNotes = this.notes.filter(data => data.noteStatus == 'completed');    
        },error =>{
        });
      }
    });
   }

  ngOnInit() {}

}
