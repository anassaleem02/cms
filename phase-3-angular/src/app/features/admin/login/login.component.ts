import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/admin/dashboard']);
      return;
    }
    this.form = this.fb.group({
      email: ['admin@fmspower.com', [Validators.required, Validators.email]],
      password: ['admin123', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.isLoading) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Invalid email or password. Please try again.';
        this.notificationService.error('Invalid email or password. Please try again.');
        this.isLoading = false;
      }
    });
  }

  get f() { return this.form.controls; }
}
