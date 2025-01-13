import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [HttpClientModule, FormsModule, CommonModule, CommonModule],
  standalone: true,
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  reenterPassword: string = '';

  firstNameError: string = '';
  lastNameError: string = '';
  phoneError: string = '';
  emailError: string = '';

  apiUrl: string = 'https://localhost:7045/api/v2/SignUp';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  validateInput(fieldName: string): void {
    const value = this[fieldName as keyof SignupComponent];
    if (fieldName === 'firstName' || fieldName === 'lastName') {
      const isValid = /^[a-zA-Z]*$/.test(value as string);
      if (!isValid) {
        if (fieldName === 'firstName') {
          this.firstNameError = 'First Name should only contain alphabets.';
        } else if (fieldName === 'lastName') {
          this.lastNameError = 'Last Name should only contain alphabets.';
        }
      } else {
        if (fieldName === 'firstName') {
          this.firstNameError = '';
        } else if (fieldName === 'lastName') {
          this.lastNameError = '';
        }
      }
    } else if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value as string)) {
        this.emailError = 'Please enter a valid email address.';
      } else {
        this.emailError = '';
      }
    } else if (fieldName === 'phone') {
      const phoneRegex = /^\+?[0-9]{10,15}$/; // Supports optional + and 10-15 digits
      if (!phoneRegex.test(value as string)) {
        this.phoneError = 'Phone number must be between 10-15 digits.';
      } else {
        this.phoneError = '';
      }
    }
  }

  onSubmit() {
    if (this.firstNameError || this.lastNameError || this.emailError || this.phoneError) {
      alert('Please fix the errors before submitting.');
      return;
    }

    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      password: this.password,
      reenterPassword: this.reenterPassword,
    };

    this.http.post(this.apiUrl, payload).subscribe(
      (response: any) => {
        if(response.response == "success"){
          this.router.navigate(['/login']);
          alert("Sign Up successful! Please login to continue.");
        }
      },
      (error) => {
        alert('Signup failed!');
        console.error('Error:', error);
      }
    );
  }
}
