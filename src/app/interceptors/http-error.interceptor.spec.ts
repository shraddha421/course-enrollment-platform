import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};
const matSnackBarMock = {
  open: jasmine.createSpy('open')
};
describe('HttpErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        HttpErrorInterceptor,
        { provide: Router, useValue: mockRouter },
            { provide: MatSnackBar, useValue: matSnackBarMock }
      ],
    })
  );

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor =
      TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
