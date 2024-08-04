import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpProviderService } from '../../../services/http-provider.service';
import Validation from '../../../_utils/Validation';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{

  password !: string;
  token   : string;
  isSuccessful = false;
  submitted = false;

  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private http: HttpClient,
     private router: Router,private httpProvider: HttpProviderService
     ,private formBuilder: FormBuilder) {
    this.token = this.route.snapshot.queryParams['token'];
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
  onSubmit() {
    this.submitted = true;
    if (!this.form.invalid) {
    const password = this.form.get("password")?.value ;

    this.httpProvider.resetPassword(this.token, password).subscribe(
    response => {
      this.isSuccessful = true;
      this.router.navigate(['/login']);
    },
    err => {
      this.isSuccessful = true; 
      //this.router.navigate(['/login']);
    }
    );
  }
    
  }

  signin(): void {
    this.router.navigate(['/login']);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}
