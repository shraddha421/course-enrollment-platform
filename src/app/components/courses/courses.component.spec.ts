import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { of } from 'rxjs';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let sharedService: SharedService;
  let router: Router;
  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const mockSharedService = {
      loggedInUserName: 'Shraddha',
      isUserLoggedIn: true,
      getCourses: jasmine.createSpy('getCourses').and.returnValue(
        of([
          {
            title: 'Angular Basics',
            author: 'John Doe',
            description: 'Learn the fundamentals of Angular framework.',
            topics: ['Components', 'Templates', 'Routing', 'Services'],
            rating: 4.5,
            showTopics: false,
            enrolled: false,
          },
          {
            title: 'Advanced TypeScript',
            author: 'Jane Smith',
            description: 'Deep dive into advanced TypeScript features.',
            topics: [
              'Generics',
              'Decorators',
              'Type Inference',
              'Utility Types',
            ],
            rating: 4.8,
            showTopics: false,
            enrolled: false,
          },
          {
            title: 'RxJS in Angular',
            author: 'Alex Johnson',
            description: 'Master reactive programming using RxJS in Angular.',
            topics: ['Observables', 'Subjects', 'Operators', 'Schedulers'],
            rating: 4.7,
            showTopics: false,
            enrolled: false,
          },
        ])
      ),
    };
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      providers: [{ provide: SharedService, useValue: mockSharedService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call api and display the courses', () => {
    const mockData = [
      {
        title: 'Angular Basics',
        author: 'John Doe',
        description: 'Learn the fundamentals of Angular framework.',
        topics: ['Components', 'Templates', 'Routing', 'Services'],
        rating: 4.5,
        showTopics: false,
        enrolled: false,
      },
      {
        title: 'Advanced TypeScript',
        author: 'Jane Smith',
        description: 'Deep dive into advanced TypeScript features.',
        topics: ['Generics', 'Decorators', 'Type Inference', 'Utility Types'],
        rating: 4.8,
        showTopics: false,
        enrolled: false,
      },
      {
        title: 'RxJS in Angular',
        author: 'Alex Johnson',
        description: 'Master reactive programming using RxJS in Angular.',
        topics: ['Observables', 'Subjects', 'Operators', 'Schedulers'],
        rating: 4.7,
        showTopics: false,
        enrolled: false,
      },
    ];
    expect(component.courses).toEqual(mockData);
  });
  it('should filter data correctly', () => {
    component.searchTerm = 'basics';
    const mockData = [
      {
        title: 'Angular Basics',
        author: 'John Doe',
        description: 'Learn the fundamentals of Angular framework.',
        topics: ['Components', 'Templates', 'Routing', 'Services'],
        rating: 4.5,
        showTopics: false,
        enrolled: false,
      },
    ];
    component.filterCourses();
    expect(component.filteredCourses).toEqual([mockData[0]]);
    expect(component.courses).not.toEqual(component.filteredCourses);
    expect(component.courses.length).toBe(3);
  });
  it('should sort data correctly', () => {
    component.sortOrder = 'desc';
    component.sort();
    expect(component.filteredCourses[0]).toEqual({
      title: 'Advanced TypeScript',
      author: 'Jane Smith',
      description: 'Deep dive into advanced TypeScript features.',
      topics: ['Generics', 'Decorators', 'Type Inference', 'Utility Types'],
      rating: 4.8,
      showTopics: false,
      enrolled: false,
    });
    component.sortOrder = 'asc';
    component.sort();
    expect(component.filteredCourses[0]).toEqual({
      title: 'Angular Basics',
      author: 'John Doe',
      description: 'Learn the fundamentals of Angular framework.',
      topics: ['Components', 'Templates', 'Routing', 'Services'],
      rating: 4.5,
      showTopics: false,
      enrolled: false,
    });
  });
  it('should enroll the user as per button click',()=>{
    component.sortOrder = 'asc';
    component.sort();
    component.enroll({title: 'Angular Basics',
      author: 'John Doe',
      description: 'Learn the fundamentals of Angular framework.',
      topics: ['Components', 'Templates', 'Routing', 'Services'],
      rating: 4.5,
      showTopics: false,
      enrolled: false,});
      expect(component.filteredCourses[0].enrolled).toBeTrue();
      expect(component.courses[0].enrolled).toBeTrue();
  })
  
  it('should view courses as per button click',()=>{
    component.viewCourses('All');
    expect(component.courses).toEqual(component.filteredCourses);
  })

  it('should view enrolled courses as per button click',()=>{
    component.viewCourses('Enrolled');
    expect(component.courses).not.toEqual(component.filteredCourses);
    expect(component.filteredCourses.length).toBe(0);
  })
  
});
