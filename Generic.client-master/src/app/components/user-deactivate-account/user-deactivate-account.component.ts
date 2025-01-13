import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-deactivate-account',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-deactivate-account.component.html',
  styleUrl: './user-deactivate-account.component.css'
})

export class DeactivateAccountComponent {
  password: string = '';
  apiUrl: string = 'https://localhost:7045/api/v2/Deactivate';
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
      userID: this.session.user.id,
      password: this.password
    };
  
    this.http.post(this.apiUrl, payload).subscribe(
      (response: any) => {
        console.log('Response:', response);
        if (response.response == 'success') {
          this.sessionService.logout(); 
          this.router.navigate(['/']).then(()=>{
            window.location.reload(); 
          });
        } else {
          alert(`Response: ${JSON.stringify(response)}`);
        }
      },
      (error) => {
        alert(`Error: ${JSON.stringify(error.error)}`);
      }
    );
  }
}
