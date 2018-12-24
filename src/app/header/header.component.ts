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
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isNoteView = true;
  isLoggedIn = false;
  category : Category;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  categories : Category[];
  filterNotes : Note[];
  notes : Note[];
  errMessage : string;
    
  constructor(private breakpointObserver: BreakpointObserver, private notesService: NotesService, private router: RouterService, private catService: CategoryService, private authService: AuthenticationService) {}

  ngOnInit() {

    const booleanPromise = this.authService.isUserAuthenticated(this.authService.getBearerToken());

    booleanPromise.then((authenticated) => {
     if (!authenticated) {
      this.categories = null;
     }
     else {
      this.catService.getCategories().subscribe(data =>{      
        this.categories = data; 
        this.isLoggedIn = true;         
      },error =>{
        
      });
     }
     });

     this.category = null; 
     this.notesService.getNotes().subscribe(data =>{
      this.notes = data;       
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
    this.category = category;
    
    if(this.category != category){
      this.category = category;
    }
    
    this.router.routeToCategoryView(this.category, this.isNoteView);
  }

  openCreateCategoryView() {   
    this.router.routeToCreateCategoryView(localStorage.getItem('userId'));
  }

  logout(){
    this.isLoggedIn = true;
    this.authService.logoutUser();
    this.router.routeToLogin();
  }

  deleteCategory(category : Category) {
             
    this.catService.deleteCategory(category).subscribe(res => {  
      this.filterNotes = this.notes.filter(note => note.category.categoryId == category.id);       

      this.filterNotes.forEach(note => {        
        note.category = null;
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
  }

  openEditCategoryView(category : Category) {      
    this.router.routeToEditCategoryView(category.id);
  }

  }
