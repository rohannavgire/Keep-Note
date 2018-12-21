import { Component, Inject, Input, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Category } from '../category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-category-view',
  templateUrl: './edit-category-view.component.html',
  styleUrls: ['./edit-category-view.component.css']
})
export class EditCategoryViewComponent implements OnInit {

  notes : Note[];
  filterNotes : Note[];
  category : Category;
  categories: Array<Category> = [];
  errMessage: string;


  constructor(private notesService: NotesService, private catService: CategoryService, public dialogRef: MatDialogRef<EditCategoryViewComponent>,
    @Inject(MAT_DIALOG_DATA) public categoryId: any) { 

      this.category = this.catService.getCategoryById(categoryId);
      this.filterNotes = [];
      this.notesService.getNotes().subscribe(res => {
        this.notes = res;        
      }

      ) 
    }

    ngOnInit() {}

  onSave() {
    this.catService.editCategory(this.category).subscribe(res => {  
      this.filterNotes = this.notes.filter(note => note.category.categoryId == res.id);       

      this.filterNotes.forEach(note => {        
        note.category = res;
        note.category.categoryId = res.id;
        note.category.id = res.id;
        this.notesService.editNote(note).subscribe(res => {
        }  
        )
      })
      
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
