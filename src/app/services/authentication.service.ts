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

  logoutUser(){
    localStorage.removeItem('userId');
    localStorage.removeItem('bearer-token');
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
    
    if(token)
      return Promise.resolve(true);
    else
      return Promise.resolve(false);
    }

}