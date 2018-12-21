import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { RouterService } from '../services/router.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../category';
import { MatListModule } from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AuthenticationService } from '../services/authentication.service';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isNoteView = true;
  category : Category;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  categories : Category[];
    
  constructor(private breakpointObserver: BreakpointObserver, private router: RouterService, private catService: CategoryService, private authService: AuthenticationService) {}

  ngOnInit() {
    this.catService.getCategories().subscribe(data =>{
      console.log("YAY data: ",data);
      
      this.categories = data;
      this.category = null;   
    },error =>{
      
    });
  }

  toggleView() {

    this.isNoteView = !(this.isNoteView);
    
    if (this.isNoteView) {
      this.router.routeToNoteView();
    }
    else if (!this.isNoteView) {
      this.router.routeToListView();
    }
  }

  showCategoryNotes(category : Category) {
    console.log("showCategoryNotes: ", category);
    this.category = category;
    // if(this.category == null) {
    //   this.category = category;
    // }
    // else if(this.category == category){
    //   this.router.routeToCategoryView(this.category, this.isNoteView);
    // }
    if(this.category != category){
      this.category = category;
    }
    
    this.router.routeToCategoryView(this.category, this.isNoteView);
  }

  openCreateCategoryView() {   
    this.router.routeToCreateCategoryView(localStorage.getItem('userId'));
  }

  logout(){
    this.authService.logoutUser();
    this.router.routeToLogin();
  }

  deleteCategory(category : Category) { 
         
    this.catService.deleteCategory(category);
  }

  openEditCategoryView(category : Category) {      
    this.router.routeToEditCategoryView(category.id);
  }

  }
