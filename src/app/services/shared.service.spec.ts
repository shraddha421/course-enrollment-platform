import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('SharedService', () => {
  let service: SharedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SharedService],
    });
    service = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have default isUserLoggedIn as false', () => {
    expect(service.isUserLoggedIn).toBeFalse();
  });
  it('should allow updating loggedInUserName', () => {
    service.loggedInUserName = 'abc';
    expect(service.loggedInUserName).toBe('abc');
  });
  it('should return courses from JSON file', () => {
    const dummyCourses = [
      { title: 'Course 1', author: 'Author 1', enrolled:false },
      { title: 'Course 2', author: 'Author 2',enrolled:false },
    ];
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(dummyCourses);
    });

    const req = httpMock.expectOne('assets/data/courses.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourses);
  });
});
