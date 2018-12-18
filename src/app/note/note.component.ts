import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import { Category } from '../category';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

@Input()
note : Note;

category : Category;
catName : string;

  constructor(private router: RouterService) { }

  ngOnInit() {
    this.category = this.note.category;    
  }

  openEditNoteView() {    
    this.router.routeToEditNoteView(this.note.noteId);
  }

}
