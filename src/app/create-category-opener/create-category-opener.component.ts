import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateCategoryViewComponent } from '../create-category-view/create-category-view.component';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-create-category-opener',
  templateUrl: './create-category-opener.component.html',
  styleUrls: ['./create-category-opener.component.css']
})
export class CreateCategoryOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: RouterService) {  

    this.dialog.open(CreateCategoryViewComponent,{

    }).afterClosed().subscribe(res => {
      router.routeBack();
    })
  }

  ngOnInit() {
    
  }

}
