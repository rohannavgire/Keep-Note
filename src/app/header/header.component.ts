import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterService } from '../services/router.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../category';
import { MatListModule } from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  isLoggedIn : boolean;
  isNoteView = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  categories : Category[];
    
  constructor(private breakpointObserver: BreakpointObserver, private router: RouterService, private catService: CategoryService, private authService: AuthenticationService) {
    this.isLoggedIn = null;
  }

  ngOnInit() {
    const booleanPromise = this.authService.isUserAuthenticated(this.authService.getBearerToken());
    return booleanPromise.then((authenticated) => {
      if (authenticated) {
        this.isLoggedIn = true;
        this.catService.getCategories().subscribe(data =>{      
          this.categories = data;   
        },error =>{
          
        });
      }
      return authenticated;
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

  openCreateCategoryView() {    
    this.router.routeToCreateCategoryView(localStorage.getItem('userId'));
  }

  openEditCategoryView(category : Category) { 
    console.log("categoryId tbe1: ",category);   
    this.router.routeToEditCategoryView(category);
  }

  logout(){
    this.authService.logoutUser();
    this.router.routeToLogin();
  }

  deleteCategory(category : Category) {      
    this.catService.deleteCategory(category);
  }

  }
