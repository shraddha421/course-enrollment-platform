import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let sharedService: SharedService;
  let router: Router;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
     const sharedServiceSpy = {
      loggedInUserName: '',
      isUserLoggedIn: false
    };
    TestBed.configureTestingModule({
          imports: [FormsModule], 
      declarations: [LoginFormComponent],
      providers: [
        { provide: SharedService, useValue: sharedServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should correctly validate form and redirect to courses', () => {
    const mockForm = {
      valid: true,
    };
    sharedService.registeredUsers=[{email: 'abc@gmail.com',name:'shraddha'}]
    component.user = { email: 'abc@gmail.com', password: '123456' };
    component.onLogin(mockForm);
    expect(sharedService.loggedInUserName).toBe('abc@gmail.com');
    expect(sharedService.isUserLoggedIn).toBeTrue();
    expect(router.navigate).toHaveBeenCalledWith(['/courses']);
  });
  it('should open registration form if user not registered', () => {
    const mockForm = {
      valid: true,
    };
    sharedService.registeredUsers=[];
    component.user = { email: 'abc@gmail.com', password: '123456' };
    component.onLogin(mockForm);
    expect(sharedService.isUserLoggedIn).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });
});
