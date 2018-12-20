import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../note';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

@Injectable()
export class NotesService {

  note: Note;
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private http:HttpClient,private authService : AuthenticationService) { 
    this.note = new Note();
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
  }

  fetchNotesFromServer() {
    let userId = localStorage.getItem('userId');
    
    this.http.get<Note[]>(`http://localhost:8082/api/v1/note/${userId}`,{
      headers : new HttpHeaders().set('authorization',`Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(notesResponse => {
      this.notes = notesResponse;
      this.notesSubject.next(this.notes);
    },err => {
         this.notesSubject.error(err);
        });
      
  }

  getNotes():BehaviorSubject<Array<Note>>{
    return this.notesSubject;
}

  addNote(note:Note):Observable<Note>{
    note.noteCreatedBy = localStorage.getItem('userId');
    return this.http.post<Note>('http://localhost:8082/api/v1/note',note,{
      headers : new HttpHeaders().set('authorization',`Bearer ${this.authService.getBearerToken()}`)
 
    }).do(addedNote => {
        this.notes.push(addedNote);
        this.notesSubject.next(this.notes);
      })    
  }

  getNoteById(noteId): Note {
    let foundNote =  this.notes.find(note => note.noteId == noteId);
    
    return Object.assign({},foundNote);
  }

  editNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`http://localhost:8082/api/v1/note/${note.noteCreatedBy}/${note.noteId}`,note,{
      headers : new HttpHeaders().set('authorization',`Bearer ${this.authService.getBearerToken()}`)
    }).do(editedNote => {
      let foundNote = this.notes.find(note => note.noteId == editedNote.noteId);
      Object.assign(foundNote,editedNote);      
      this.notesSubject.next(this.notes);
    })
  }
}