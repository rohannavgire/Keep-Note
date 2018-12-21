import { Injectable } from '@angular/core';
import { Reminder } from '../reminder';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ReminderService {

  reminder : Reminder;
  reminderList : Reminder[];
  remSubject = new BehaviorSubject([]);

  constructor(private http:HttpClient,private authService : AuthenticationService) {
    this.reminder = null;
    this.reminderList = [];
   }

   fetchRemindersFromServer() {
    let userId = localStorage.getItem('userId');
    
    this.http.get<Reminder[]>(`http://localhost:8081/api/v1/reminder/all/${userId}`,{
      headers : new HttpHeaders().set('authorization',`Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(remindersResponse => {
      this.reminderList = remindersResponse;
      this.remSubject.next(this.reminderList);
      return this.reminderList;
    },err => {
         this.remSubject.error(err);
        });
      
  }

  getReminders():BehaviorSubject<Array<Reminder>>{
    this.fetchRemindersFromServer();
    return this.remSubject;
}

addReminder(reminder:Reminder):Observable<Reminder>{
  reminder.reminderCreatedBy = localStorage.getItem('userId');
  return this.http.post<Reminder>('http://localhost:8081/api/v1/reminder',reminder,{
    headers : new HttpHeaders().set('authorization',`Bearer ${this.authService.getBearerToken()}`)

  }).do(addedReminder => {
      this.reminderList.push(addedReminder);
      this.remSubject.next(this.reminderList);
    })    
}

deleteReminder(reminder: Reminder): Observable<Reminder> {
  console.log("in rem service delete: ",reminder.reminderId);
  
  return this.http.delete<Reminder>(`http://localhost:8081/api/v1/reminder/${reminder.reminderId}`,{
    headers : new HttpHeaders().set('authorization',`Bearer ${this.authService.getBearerToken()}`)
  }).do(resp => {
    console.log("resp: ", resp);
    
  })
}
}
