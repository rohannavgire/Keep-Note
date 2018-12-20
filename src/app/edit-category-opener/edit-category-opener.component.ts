import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditCategoryViewComponent } from '../edit-category-view/edit-category-view.component';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-category-opener',
  templateUrl: './edit-category-opener.component.html',
  styleUrls: ['./edit-category-opener.component.css']
})
export class EditCategoryOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: RouterService) {  

    this.dialog.open(EditCategoryViewComponent,{

    }).afterClosed().subscribe(res => {
      router.routeBack();
    })
  }

  ngOnInit() {
    
  }

}
