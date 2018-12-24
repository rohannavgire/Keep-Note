import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditReminderViewComponent } from '../edit-reminder-view/edit-reminder-view.component';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-reminder-opener',
  templateUrl: './edit-reminder-opener.component.html',
  styleUrls: ['./edit-reminder-opener.component.css']
})
export class EditReminderOpenerComponent implements OnInit {

  reminderId: string;

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: RouterService) { 
    // this.activatedRoute.params.subscribe(params => {
    //   this.noteId = params.noteId});
    this.reminderId = this.activatedRoute.snapshot.paramMap.get('reminderId');    

    this.dialog.open(EditReminderViewComponent,{
      data: this.reminderId
    }).afterClosed().subscribe(res => {
      router.routeBack();
    })
  }

  ngOnInit() {
    
  }

}
