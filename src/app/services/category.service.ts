import { Injectable } from '@angular/core';
import { Category } from "../category";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CategoryService {

  category: Category;
  categories: Array<Category>;
  catSubject = new BehaviorSubject([]);
  catId : string;

  constructor(private http:HttpClient,private authService : AuthenticationService) {
    this.category = new Category();
    this.categories = [];
   }

   fetchCategoriesFromServer() {
    let userId = localStorage.getItem('userId');
    
    this.http.get<Category[]>(`http://localhost:8083/api/v1/category/all/${userId}`,{
      headers : new HttpHeaders().set('authorization',`Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(categoriesResponse => {
      this.categories = categoriesResponse;
      this.catSubject.next(this.categories);
      return this.categories;
    },err => {
         this.catSubject.error(err);
        });
      
  }

  getCategories():BehaviorSubject<Array<Category>>{
    this.fetchCategoriesFromServer();
    return this.catSubject;
}

addCategory(category:Category):Observable<Category>{
  category.categoryCreatedBy = localStorage.getItem('userId');
  return this.http.post<Category>('http://localhost:8083/api/v1/category',category,{
    headers : new HttpHeaders().set('authorization',`Bearer ${this.authService.getBearerToken()}`)

  }).do(addedCategory => {
      this.categories.push(addedCategory);
      this.catSubject.next(this.categories);
    })    
}

getCategoryById(catId): Category {
  let foundCategory =  this.categories.find(category => category.id == catId);
  
  return Object.assign({},foundCategory);
}

editCategory(category: Category): Observable<Category> {
  return this.http.put<Category>(`http://localhost:8083/api/v1/category/${category.id}`,category,{
    headers : new HttpHeaders().set('authorization',`Bearer ${this.authService.getBearerToken()}`)
  }).do(editedCategory => {
    let foundCategory = this.categories.find(category => category.id == editedCategory.id);
    Object.assign(foundCategory,editedCategory);
    this.catSubject.next(this.categories);
  })
}

// deleteCategory(category: Category): Observable<Category> {
//   this.catId = category.categoryId;
//   console.log("CAT TBDS: ", this.catId);
//   return this.http.delete<Category>(`http://localhost:8083//api/v1/category/${category.categoryId}`,{
//     headers : new HttpHeaders().set('authorization',`Bearer ${this.authService.getBearerToken()}`)
//   })
// }

deleteCategory(category: Category) {
  console.log("in cat service delete: ",category.id);
  
  this.http.delete<Category>(`http://localhost:8083/api/v1/category/${category.id}`,{
    headers : new HttpHeaders().set('authorization',`Bearer ${this.authService.getBearerToken()}`)
  })
}

}
