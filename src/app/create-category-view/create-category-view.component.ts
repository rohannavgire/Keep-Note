import { Component, Inject, Input, OnInit } from '@angular/core';
import { Category } from '../category';
import { NotesService } from '../services/notes.service';
import { CategoryService } from '../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-category-view',
  templateUrl: './create-category-view.component.html',
  styleUrls: ['./create-category-view.component.css']
})
export class CreateCategoryViewComponent implements OnInit {

  category: Category;
  categories: Array<Category> = [];
  errMessage: string;


  constructor(private notesService: NotesService, private catService: CategoryService, public dialogRef: MatDialogRef<CreateCategoryViewComponent>) { 
      this.catService.getCategories().subscribe(data =>{
        this.categories = data;       
      },error =>{
        
      });

      this.category = new Category();
    }

    ngOnInit() {

    }

  onSave() {
    this.category.categoryCreatedBy = localStorage.getItem('userId');
    this.catService.addCategory(this.category).subscribe(res => {      
    },
  error=> {
    if(error.status == 404) {
      this.errMessage = error.message;
    }
    else {
      this.errMessage = error.message;
    }
  });
    this.dialogRef.close();
  }  


}
