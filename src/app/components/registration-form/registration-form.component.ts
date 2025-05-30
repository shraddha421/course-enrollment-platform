import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  public registrationForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _sharedService: SharedService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }
  // Custom validator for password strength
  private passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[\W_]/.test(value);
    const isLongEnough = value.length >= 8;

    const valid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      isLongEnough;

    return valid
      ? null
      : {
          passwordStrength:
            'Password must include uppercase, lowercase, number, special character and be at least 8 characters long.',
        };
  }
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const email = this.registrationForm.get('email').value;
      const name = this.registrationForm.get('name').value;
      const user = this._sharedService.registeredUsers.find(
        (user) => user.email === name && user.name === name
      );
      //If user doesn't exist, add in array to store all users
      if (!user) {
        this._sharedService.registeredUsers.push({ name: name, email: email });
      }
      this.router.navigate(['/login']);
    }
  }
}
