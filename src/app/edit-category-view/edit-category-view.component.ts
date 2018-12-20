import { Component, Inject, Input, OnInit } from '@angular/core';
import { Category } from '../category';
import { NotesService } from '../services/notes.service';
import { CategoryService } from '../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-category-view',
  templateUrl: './edit-category-view.component.html',
  styleUrls: ['./edit-category-view.component.css']
})
export class EditCategoryViewComponent implements OnInit {

  category: Category;
  categories: Array<Category> = [];
  errMessage: string;


  constructor(private notesService: NotesService, private catService: CategoryService, public dialogRef: MatDialogRef<EditCategoryViewComponent>,
    @Inject(MAT_DIALOG_DATA) public categoryId: any) {       
      console.log("categoryId tbe2: ",categoryId);
      
      this.category = this.catService.getCategoryById(categoryId);
    }

    ngOnInit() {

    }

  onSave() {
    this.catService.editCategory(this.category).subscribe(res => {      
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
