import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let sharedService: SharedService;
  let router: Router;
  let navigateSpy: jasmine.Spy;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      providers: [AuthGuard, SharedService],
    });
    guard = TestBed.inject(AuthGuard);
    sharedService = TestBed.inject(SharedService);
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should prevent access and redirect to login when user is not logged in', () => {
    sharedService.isUserLoggedIn = false;
    expect(guard.canActivate()).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
