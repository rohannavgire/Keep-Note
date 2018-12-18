import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { RouterService } from '../services/router.service';

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
    
  constructor(private breakpointObserver: BreakpointObserver, private router: RouterService) {}

  ngOnInit() {

    
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
  
  }
