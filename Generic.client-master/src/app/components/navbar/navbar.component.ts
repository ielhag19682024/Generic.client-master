import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], 
  standalone: true,
  imports: [CommonModule] // 
})
export class NavbarComponent {
  constructor(public sessionService: SessionService, private router: Router) {}

  navigateToLogin(): void {
    this.router.navigate(['/login']); 
  }

  toggleVerifyPhone(): void {
    this.sessionService.session$.subscribe(session => {
      if(session?.user?.phoneVerified === false) {
        this.sessionService.updateUserPhoneVerified(true);
      } else {
        this.sessionService.updateUserPhoneVerified(false);
      }
    });
    this.router.navigate(['/']).then(()=>{
      window.location.reload(); 
    });
  }

  logout(): void {
    this.sessionService.logout(); 
    this.router.navigate(['/']).then(()=>{
      window.location.reload(); 
    });
  }
}
