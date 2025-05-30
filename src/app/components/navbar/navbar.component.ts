import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() enrolledCount: number = 0;
  @Output() viewCoursesEvent=new EventEmitter<string>();
  public userName: string = '';
  public viewEnrolled = false;
  constructor(private _sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    //Show loggged in user name at theb left of navigation bar
    const user = this._sharedService.registeredUsers.find(
      (user) => user.email === this._sharedService.loggedInUserName
    );
    if (user) {
      this.userName = user.name;
    }
  }
  //Send event to parent to show all courses/enrolled courses
  toggleErolledCourses():void{
    this.viewEnrolled= !this.viewEnrolled;
    if(this.viewEnrolled)
      {
        this.viewCoursesEvent.emit('Enrolled');
      }else{        
        this.viewCoursesEvent.emit('All');
      }
  }
  //Route directly to login page
  public logout(): void {
    this._sharedService.isUserLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
