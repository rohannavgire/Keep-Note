import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Category } from '../category';
@Injectable()
export class RouterService {
  categoryId : string;
  constructor(private router:Router, private location: Location) { }
  routeToLogin(){
    this.router.navigate(['login'])
  }
  // routeToCreateUserView(){
  //   console.log("Create user view1.");
  //   this.router.navigate(['register',{
  //   outlets: {
  //     'createUserOutlet': []
  //   }
  //   }
  // ])
  // }

  routeToCreateUserView(){
    this.router.navigate(['register',{
    outlets: {
      'createUserOutlet': []
    }
    }
  ])
  }

  routeToDashboard(){
    this.router.navigate(['dashboard']);
  }
  routeToNoteView(){
    this.router.navigate(['dashboard/view/noteview']);
  }
  routeToListView(){
    this.router.navigate(['dashboard/view/listview']);
  }
  routeToCategoryView(category : Category, isNoteView : boolean){
    if(category != null) {
      this.categoryId = category.id;
    }
    else {
      this.categoryId = null;
    }
    
    if(category == null) {
      if(isNoteView) {
        this.router.navigate(['dashboard/view/noteview']);
      }
      else {
        this.router.navigate(['dashboard/view/listview']);
      }
    }
    else {      
      
      if(isNoteView) {
        this.router.navigate([`dashboard/view/noteview/${this.categoryId}`]);
      }
      else {
        this.router.navigate([`dashboard/view/listview/${this.categoryId}`]);
      }
  }
  }
  routeToEditNoteView(noteId){
    this.router.navigate(['dashboard',{
    outlets: {
      'noteEditOutlet': ['note', noteId, 'edit']
    }
    }
  ])
  }

  routeToCreateCategoryView(userId){
    this.router.navigate(['dashboard',{
    outlets: {
      'createCategoryOutlet': [userId]
    }
    }
  ])
  }

  routeToEditCategoryView(categoryId){
    this.router.navigate(['dashboard',{
    outlets: {
      'editCategoryOutlet': ['category', categoryId, 'edit']
    }
    }
  ])
  }  

  routeBack() {
    this.location.back();
  }
}