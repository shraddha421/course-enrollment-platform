import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormComponent } from './registration-form.component';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let sharedService: SharedService;
  let router: Router;
  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const sharedServiceSpy = {
      loggedInUserName: '',
      isUserLoggedIn: false,
    };
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [RegistrationFormComponent],
      providers: [
        FormBuilder,
        { provide: SharedService, useValue: sharedServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a registration form with specified controls', () => {
    expect(component.registrationForm.contains('name')).toBeTruthy();
    expect(component.registrationForm.contains('email')).toBeTruthy();
    expect(component.registrationForm.contains('mobile')).toBeTruthy();
    expect(component.registrationForm.contains('password')).toBeTruthy();
    expect(component.registrationForm.contains('password1')).toBeFalsy();
  });
  it('shoulld validate email field', () => {
    const control = component.registrationForm.get('email');
    control.setValue('asgmail.com');
    expect(control.valid).toBeFalse();
  });
  it('shoulld validate name field for required attribute', () => {
    const control = component.registrationForm.get('name');
    control.setValue('');
    expect(control.valid).toBeFalse();
  });
  it('should not call onSubmit when form is invalid', () => {
    component.registrationForm.controls['name'].setValue('');
    component.registrationForm.controls['email'].setValue('');
    component.registrationForm.controls['mobile'].setValue('');
    component.registrationForm.controls['password'].setValue('');
    sharedService.registeredUsers = [];
    spyOn(component, 'onSubmit');
    const formEl = fixture.debugElement.query(By.css('form'));
    formEl.triggerEventHandler('ngSubmit', null);
    expect(sharedService.registeredUsers).toEqual([]);
  });
  it('should call onSubmit when form is valid', () => {
    component.registrationForm.get('name').setValue('asdas');
    component.registrationForm.get('email').setValue('sdas@gmail.com');
    component.registrationForm.get('mobile').setValue('9860434343');
    component.registrationForm.get('password').setValue('Aasdas@123');
    spyOn(component, 'onSubmit');
    const formEl = fixture.debugElement.query(By.css('form'));
    formEl.triggerEventHandler('ngSubmit', null);
    expect(component.onSubmit).toHaveBeenCalled();
  });
  it('should register the name and email when form is valid', () => {
    component.registrationForm.get('name').setValue('asdas');
    component.registrationForm.get('email').setValue('sdas@gmail.com');
    component.registrationForm.get('mobile').setValue('9860434343');
    component.registrationForm.get('password').setValue('Aasdas@123');
    sharedService.registeredUsers = [];
    component.onSubmit();
    expect(sharedService.registeredUsers[0]).toEqual({
      name: 'asdas',
      email: 'sdas@gmail.com',
    });
  });
});
