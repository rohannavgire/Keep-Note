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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isNoteView = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  categories : Category[];
    
  constructor(private breakpointObserver: BreakpointObserver, private router: RouterService, private catService: CategoryService) {}

  ngOnInit() {
    this.catService.getCategories().subscribe(data =>{
      console.log("YAY data: ",data);
      
      this.categories = data;   
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

  openCreateCategoryView() {    
    this.router.routeToCreateCategoryView(localStorage.getItem('userId'));
  }
  
  }
