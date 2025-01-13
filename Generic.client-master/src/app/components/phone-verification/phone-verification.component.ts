import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class PhoneVerificationComponent implements OnInit {
  @Input() phoneNumber: string = '';
  @Input() phoneVerified: boolean = false;
  verificationCode: string = '';
  isOtpSent: boolean = false;
  apiUrl: string = 'https://localhost:7045/api/Twilio';

  constructor(
    private http: HttpClient,
    private session: SessionService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  sendOtp(channel: 'sms' | 'call') {
    const payload = {
      phoneNumber: this.phoneNumber,
      channel: channel, // 'sms' or 'call'
    };

    this.http.post(`${this.apiUrl}/SendOtp`, payload).subscribe({
      next: (response) => {
        this.isOtpSent = true; // Show OTP input and Verify button
        console.log('OTP sent successfully:', response);
      },
      error: (error) => {
        alert('Failed to send OTP. Please try again.');
        console.error('Error sending OTP:', error);
      },
    });
  }

  verifyOtp() {
    if (!this.verificationCode) {
      alert('Please enter the verification code');
      return;
    }

    const payload = {
      phoneNumber: this.phoneNumber,
      otp: this.verificationCode,
    };

    this.http.post(`${this.apiUrl}/VerifyOtp`, payload).subscribe({
      next: (response: any) => {
        if (response.response === 'success') {
          this.session.updateUserPhoneVerified(true);
          window.location.reload(); // Refresh the page or navigate elsewhere
        } else {
          alert('Verification failed. Please try again.');
        }
      },
      error: (error) => {
        alert('Verification failed. Please try again.');
        console.error('Error verifying OTP:', error);
      },
    });
  }
}
