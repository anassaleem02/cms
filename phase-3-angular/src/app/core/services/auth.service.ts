import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, LoginDto, ChangePasswordDto } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();
  private _user = new BehaviorSubject<AuthResponse | null>(null);
  user$ = this._user.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        this._isLoggedIn.next(true);
        this._user.next(JSON.parse(user));
      } catch { this.logout(); }
    }
  }

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, dto).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res));
        this._isLoggedIn.next(true);
        this._user.next(res);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._isLoggedIn.next(false);
    this._user.next(null);
  }

  getToken(): string | null { return localStorage.getItem('token'); }
  get isLoggedIn(): boolean { return this._isLoggedIn.value; }
  get currentUser(): AuthResponse | null { return this._user.value; }

  changePassword(dto: ChangePasswordDto): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/change-password`, dto);
  }
}
