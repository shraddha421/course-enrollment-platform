import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { NavbarComponent } from './navbar.component';
import { MatMenuModule } from '@angular/material/menu';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    sharedServiceSpy = jasmine.createSpyObj('SharedService', ['logout']);
    await TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [NavbarComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: SharedService, useValue: sharedServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    sharedServiceSpy.registeredUsers = [{ name: 'Shraddha', email: 'abc' }];
    sharedServiceSpy.loggedInUserName = 'abc';
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display logged in user name', () => {
    sharedServiceSpy.registeredUsers = [{ name: 'Shraddha', email: 'abc' }];
    const span = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(span.textContent).toContain('Welcome, Shraddha');
  });

  it('should logout and navigate to login', () => {
    component.logout();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should emit view all courses event when button is clicked to view', () => {
    component.viewEnrolled = true;
    spyOn(component.viewCoursesEvent, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.viewCoursesEvent.emit).toHaveBeenCalledWith('All');
  });
  it('should emit view enrolled courses event when button is clicked to view', () => {
    component.viewEnrolled = false;
    spyOn(component.viewCoursesEvent, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.viewCoursesEvent.emit).toHaveBeenCalledWith('Enrolled');
  });
});
