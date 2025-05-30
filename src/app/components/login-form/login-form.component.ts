import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public user = {
    email: '',
    password: '',
  };
  constructor(private router: Router, private _sharedService: SharedService) {}

  ngOnInit(): void {}
  public onLogin(form: any): void {
    if (form.valid) {
      //Check If user already exists 
      const existingUser = this._sharedService.registeredUsers.find(
        (reguser) => reguser.email === this.user.email
      );
      if (existingUser) {
        console.log('Login Successful', this.user);
        this._sharedService.loggedInUserName = this.user.email;
        this._sharedService.isUserLoggedIn = true;
        this.router.navigate(['/courses']);
      } else {
        alert(`You are not yet registered! Please register first`);
        this.router.navigate(['/register']);
      }
    }
  }
}
