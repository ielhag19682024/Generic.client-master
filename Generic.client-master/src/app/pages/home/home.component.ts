import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { PhoneVerificationComponent } from '../../components/phone-verification/phone-verification.component';

declare global {
  interface Window {
    bootstrap: any;
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, DashboardComponent, PhoneVerificationComponent],
})
export class HomeComponent implements OnInit {
  @ViewChild(PhoneVerificationComponent) verification!: PhoneVerificationComponent;
  session: any;

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit() {
    this.session = this.sessionService.getSession();
  }

  logout() {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  verifyPhone() {
    const modal = new window.bootstrap.Modal(document.getElementById('verifyPhoneModal'));
    // this.verification.sendOtp();
    modal.show();
  }
}
