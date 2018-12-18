import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticateUser(user:User){
    console.log("Tryinggg: ", user);
    
    return this.http.post('http://localhost:8089/api/v1/auth/login',user);
  }

  setUserId(userId:string){
    localStorage.setItem('userId',userId);
  }

  setBearerToken(token:string){
    localStorage.setItem('bearer-token',token);
  }

  getBearerToken(){
    return localStorage.getItem('bearer-token');
  } 

  isUserAuthenticated(token): Promise<boolean> {
    // return this.http.post(`http://localhost:3000/auth/v1/isAuthenticated`, {}, {
    //    headers: new HttpHeaders().set('authorization', `Bearer ${token}`)
    //  })
    //  .map((res) => res['isAuthenticated'])
    if(token == localStorage.getItem('bearer-token'))
      return Promise.resolve(true);
    else
      return Promise.resolve(false);
    }

}