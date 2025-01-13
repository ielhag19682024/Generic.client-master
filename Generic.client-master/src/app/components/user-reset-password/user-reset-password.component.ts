import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-reset-password.component.html',
  styleUrl: './user-reset-password.component.css'
})

export class ResetPasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  newPasswordRe: string = '';
  apiUrl: string = 'https://localhost:7045/api/v2/UpdatePassword';
  session: any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private sessionService: SessionService
  ) {} 

  ngOnInit() {
    this.session = this.sessionService.getSession();
  }

  onSubmit() {
    const payload = {
      userID:  this.session.user.id,
      oldPassword: this.currentPassword,
      NewPassword: this.newPassword
    };
  
    this.http.post(this.apiUrl, payload).subscribe(
      (response: any) => {
        console.log('Response:', response);
        if (response.response == 'success') {
          window.location.reload();
          alert("passowrd updated successfully")
        } else {
          alert(`Response: ${JSON.stringify(response)}`);
        }
      },
      (error) => {
        alert(`Error: ${JSON.stringify(error.error)}`);
      }
    );
  }
  

  redirectToSignup() {
    this.router.navigate(['/signup']);
  }
}