import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticateUser(user:User){    
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
    if(token) {
    const helper = new JwtHelper();
    const decodedToken = helper.decodeToken(token);
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);

    if(!isExpired) {
        return Promise.resolve(true);      
      }
      else {
        return Promise.resolve(false);
      }
    }
    else {
      return Promise.resolve(false);
    }
  }
}