import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isUserLoggedIn:boolean=false;
  public loggedInUserName:string='';
  public registeredUsers:{name:string, email:string}[]=[];
  constructor(private http:HttpClient) { }
  //Return courses by adding 'enrolled' state
   getCourses(): Observable<any> {
    return this.http.get<any>('assets/data/courses.json').pipe(map(courses => courses.map(course => ({ ...course, enrolled: false }))));
  }
}
