import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { NotesService } from './services/notes.service';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';
import { CategoryService } from './services/category.service';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteComponent } from './note/note.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { CreateCategoryOpenerComponent } from './create-category-opener/create-category-opener.component';
import { CreateCategoryViewComponent } from './create-category-view/create-category-view.component';
import {MatChipsModule} from '@angular/material/chips';
import { ReminderService } from './services/reminder.service';
import { EditCategoryOpenerComponent } from './edit-category-opener/edit-category-opener.component';
import { EditCategoryViewComponent } from './edit-category-view/edit-category-view.component';

const appRoutes : Routes = [
  {
    path:'login',component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[CanActivateRouteGuard],
    children: [
      {
        path: 'view/noteview', component: NoteViewComponent
      },
      {
        path: 'view/listview', component: ListViewComponent
      },
      {
        path: '', redirectTo: 'view/noteview', pathMatch: 'full'
      },
      {
        path: 'note/:noteId/edit', component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      },
      {
        path: ':userId', component: CreateCategoryOpenerComponent,
        outlet: 'createCategoryOutlet'
      },
      {
        path: 'category/:categoryId/edit', component: EditCategoryOpenerComponent,
        outlet: 'editCategoryOutlet'
      }
    ]
  },
  {
    path:'',redirectTo:'dashboard',pathMatch:'full'
  }
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    ListViewComponent,
    NoteComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    CreateCategoryOpenerComponent,
    CreateCategoryViewComponent,
    EditCategoryOpenerComponent,
    EditCategoryViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    MatSelectModule,
    MatChipsModule
  ],
  providers: [NotesService,CanActivateRouteGuard,RouterService,AuthenticationService,CategoryService,ReminderService],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent, CreateCategoryViewComponent, EditCategoryViewComponent]
})
export class AppModule { }