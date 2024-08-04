import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpProviderService } from '../../../services/http-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password-request',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './reset-password-request.component.html',
  styleUrl: './reset-password-request.component.scss'
})
export class ResetPasswordRequestComponent {
  
  email !: string;
  isSuccessful = false;

  
  constructor(private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService,private http: HttpClient) { }
  onSubmit() {
    this.httpProvider.resetpassrequest(this.email).subscribe(
      response => {
        
        this.isSuccessful = true;
      },
      err => {
       
        this.isSuccessful = true; 
      }
      );
  }

  signin(): void {
    this.router.navigate(['/login']);
  }
}
