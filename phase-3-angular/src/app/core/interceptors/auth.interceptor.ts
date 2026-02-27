import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();

    const token = this.authService.getToken();
    let authReq = req;
    if (token) {
      authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/admin/login']);
          this.notificationService.error('Session expired. Please login again.');
        } else if (error.status === 403) {
          this.notificationService.error('You do not have permission to perform this action.');
        } else if (error.status === 404) {
          // Let component handle 404
        } else if (error.status === 422 || error.status === 400) {
          const msg = error.error?.message || error.error?.errors ? Object.values(error.error.errors).flat().join(', ') : 'Validation failed.';
          this.notificationService.error(String(msg));
        } else if (error.status >= 500) {
          this.notificationService.error('Server error. Please try again later.');
        }
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.hide())
    );
  }
}
