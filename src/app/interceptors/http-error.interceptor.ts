import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router,private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        let errorMessage = 'An unknown error occurred.';
        if (error.status === 401) {
          errorMessage = 'Session expired. Please log in again.';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 4000,
            panelClass: ['snackbar-error'],
          });

          // Redirect to login
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          errorMessage = 'Access denied.';
        } else if (error.status === 404) {
          errorMessage = 'Requested resource not found.';
        } else if (error.status === 500) {
          errorMessage = 'Internal server error.';
        }

        if (error.status !== 401) {
          this.snackBar.open(errorMessage, 'Close', {
            duration: 4000,
            panelClass: ['snackbar-error'],
          });
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
