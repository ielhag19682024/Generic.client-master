import { Component } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailOrPhone: string = '';
  password: string = '';
  apiUrl: string = 'https://localhost:7045/api/v2/Login'; 

  constructor(
    private http: HttpClient, 
    private router: Router,
    private sessionService: SessionService
  ) {} 

  onSubmit() {
    const payload = {
      EmailOrPhone: this.emailOrPhone,
      Password: this.password,
    };
  
    this.http.post(this.apiUrl, payload).subscribe(
      (response: any) => {
        console.log('Response:', response);
        if (response.response == 'success') {

          let user = {
            id: response.userId,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            phone: response.phone,
            emailVerified: response.emailIsVerified,
            phoneVerified: response.phoneIsVerified,
          };
          this.sessionService.login(user);
          this.router.navigate(['']); 
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