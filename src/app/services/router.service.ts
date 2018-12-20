import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Injectable()
export class RouterService {
  constructor(private router:Router, private location: Location) { }
  routeToLogin(){
    this.router.navigate(['login'])
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
  routeBack() {
    this.location.back();
  }
}