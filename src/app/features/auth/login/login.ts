import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { 
  FormGroup, 
  FormControl, 
  Validators, 
  ReactiveFormsModule 
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

/**
 * LoginComponent handles user authentication in the application.
 * Uses Reactive Forms for form handling and validation.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  /**
   * The login form group containing all form controls
   * @property loginForm
   */
  protected loginForm!: FormGroup;

  /**
   * Controls visibility of error toast
   * @property showErrorToast
   */
  protected showErrorToast: boolean = false;

  /**
   * Error message to display in toast
   * @property errorMessage
   */
  protected errorMessage: string = '';

  /**
   * Loading state for the submit button
   * @property isLoading
   */
  protected isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Initializes the component and sets up the login form
   * with validation rules
   */
  ngOnInit(): void {
    this.initializeForm();

    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Creates and configures the login form with validation rules
   * @private
   */
  private initializeForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  /**
   * Handles form submission for user login
   * Attempts to log in the user and navigate to profile on success
   */
  protected onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.showErrorToast = false;

      try {
        this.authService.login(this.loginForm.value);
        this.router.navigate(['/']);
      } catch (error) {
        this.errorMessage = error instanceof Error ? error.message : 'Login failed';
        this.showErrorToast = true;
        
        // Auto-hide error toast after 5 seconds
        setTimeout(() => {
          this.showErrorToast = false;
        }, 5000);
      } finally {
        this.isLoading = false;
      }
    } else {
      this.markFormFieldsAsTouched();
    }
  }

  /**
   * Marks all form fields as touched to trigger validation displays
   * @private
   */
  private markFormFieldsAsTouched(): void {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  /**
   * Checks if a form field has a specific validation error
   * @param controlName The name of the form control to check
   * @param errorName The type of error to check for
   * @returns boolean indicating if the error exists
   */
  protected hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control?.touched && control?.hasError(errorName) || false;
  }
}