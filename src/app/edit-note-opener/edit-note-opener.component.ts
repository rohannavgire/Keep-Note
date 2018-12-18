import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  noteId: number;

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: RouterService) { 
    // this.activatedRoute.params.subscribe(params => {
    //   this.noteId = params.noteId});
    this.noteId = +this.activatedRoute.snapshot.paramMap.get('noteId');

    this.dialog.open(EditNoteViewComponent,{
      data: this.noteId
    }).afterClosed().subscribe(res => {
      router.routeBack();
    })
  }

  ngOnInit() {
    
  }

}
