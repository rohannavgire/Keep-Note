import { Injectable } from '@angular/core';
import { User } from "../user";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  user : User;

  constructor(private http:HttpClient) {
    this.user = new User();
   }

   addUser(user:User):Observable<User>{   

    return this.http.post<User>('http://localhost:8089/api/v1/auth/register',user,{
        
    }).do(addedUser => {
      
    })  
  }

}
