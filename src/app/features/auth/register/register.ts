import { Component, OnInit } from '@angular/core';
import { 
  FormGroup, 
  FormControl, 
  Validators, 
  ReactiveFormsModule 
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDTO } from '../../../core/models/user';

/**
 * RegisterComponent handles new user registration in the application.
 * Uses Reactive Forms for form handling and validation.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class RegisterComponent implements OnInit {
  /**
   * The registration form group containing all form controls
   * @property registerForm
   */
  protected registerForm!: FormGroup;

  /**
   * Error message to display when registration fails
   * @property errorMessage
   */
  protected errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Initializes the component and sets up the registration form
   * with validation rules
   */
  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Creates and configures the registration form with validation rules
   * @private
   */
  private initializeForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ])
    });
  }

  /**
   * Handles form submission for user registration
   * Validates form, calls auth service, and handles success/error states
   */
  /**
   * Controls visibility of success toast
   * @property showSuccessToast
   */
  protected showSuccessToast: boolean = false;

  /**
   * Handles form submission for user registration
   * Validates form, calls auth service, and handles success/error states
   */
  protected onSubmit(): void {
    if (this.registerForm.valid) {
      const userData: CreateUserDTO = this.registerForm.value;
      
      try {
        this.authService.register(userData);
        this.showSuccessToast = true;
        
        // Navigate to login after 5 seconds
        setTimeout(() => {
          this.showSuccessToast = false;
          this.router.navigate(['/login']);
        }, 5000);
      } catch (error) {
        this.errorMessage = error instanceof Error ? 
          error.message : 
          'Registration failed. Please try again.';
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
    Object.values(this.registerForm.controls).forEach(control => {
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
    const control = this.registerForm.get(controlName);
    return control?.touched && control?.hasError(errorName) || false;
  }
}