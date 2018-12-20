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

  categoryId: string;

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: RouterService) { 
    // this.activatedRoute.params.subscribe(params => {
    //   this.noteId = params.noteId});
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');    

    this.dialog.open(EditCategoryViewComponent,{
      data: this.categoryId
    }).afterClosed().subscribe(res => {
      router.routeBack();
    })
  }

  ngOnInit() {
    
  }

}
