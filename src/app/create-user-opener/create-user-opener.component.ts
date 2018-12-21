import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateUserViewComponent } from '../create-user-view/create-user-view.component';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-create-user-opener',
  templateUrl: './create-user-opener.component.html',
  styleUrls: ['./create-user-opener.component.css']
})
export class CreateUserOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: RouterService) {  

    this.dialog.open(CreateUserViewComponent,{

    }).afterClosed().subscribe(res => {
      router.routeBack();
    })
  }

  ngOnInit() {
    
  }

}
