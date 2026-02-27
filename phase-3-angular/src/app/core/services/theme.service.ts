import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = new BehaviorSubject<'dark' | 'light'>('dark');
  theme$ = this._theme.asObservable();

  constructor() {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const initial = saved || 'dark';
    this._theme.next(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }

  toggle(): void {
    const next = this._theme.value === 'dark' ? 'light' : 'dark';
    this._theme.next(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }

  get isDark(): boolean { return this._theme.value === 'dark'; }
}
