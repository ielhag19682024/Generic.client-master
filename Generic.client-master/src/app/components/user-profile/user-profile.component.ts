import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service'; // Adjust import path
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from '../user-reset-password/user-reset-password.component';
import { DeactivateAccountComponent } from '../user-deactivate-account/user-deactivate-account.component';

@Component({
  selector: 'app-signup',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [
    FormsModule, 
    HttpClientModule, 
    CommonModule, 
    ResetPasswordComponent, 
    DeactivateAccountComponent
  ],
  standalone: true,
})
export class UserProfileComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';
  firstNameError: string = '';
  lastNameError: string = '';
  phoneError: string = '';
  emailError: string = '';
  apiUrl: string = 'https://localhost:7045/api/v2/Refer';

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const user = this.sessionService.session$.subscribe((session) => {
      if (!session) {
        console.error('Session not found!');
        return;
      }
      if (session.user) {

        console.log(session.user);
        this.firstName = session.user.firstName || '';
        this.lastName = session.user.lastName || '';
        this.phone = session.user.phone || '';
        this.email = session.user.email || '';
      }
    }
    );
  }

  validateInput(fieldName: string): void {
    const value = this[fieldName as keyof UserProfileComponent];
    if (fieldName === 'firstName' || fieldName === 'lastName') {
      const isValid = /^[a-zA-Z]*$/.test(value as string);
      if (!isValid) {
        (this as any)[fieldName + 'Error'] = `${fieldName} should only contain alphabets.`;
      } else {
        (this as any)[fieldName + 'Error'] = '';
      }
    } else if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value as string)) {
        this.emailError = 'Please enter a valid email address.';
      } else {
        this.emailError = '';
      }
    } else if (fieldName === 'phone') {
      const phoneRegex = /^\+?[0-9]{10,15}$/;
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
      email: this.email
    };

    this.http.post(this.apiUrl, payload).subscribe(
      (response: any) => {
        if (response.response === "success") {
          // this.router.navigate(['/login']);
        }
      },
      (error) => {
        alert('Referral failed!');
        console.error('Error:', error);
      }
    );
  }

  resetPassword() {
    const modal = new window.bootstrap.Modal(document.getElementById('resetPasswordModal'));
    modal.show();
  }

  deactivateAccount() {
    const modal = new window.bootstrap.Modal(document.getElementById('deactivateAccountModal'));
    modal.show();
  }

}
