import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import Validation from '../../../_utils/Validation';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,ToastrModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
 /* form: any = {
    username: null,
    email: null,
    password: null
  };*/
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  
 

  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;

  constructor(private authService: AuthService,private router: Router,private formBuilder: FormBuilder) {
   }
   

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
 
    if (!this.form.invalid) {
      
      const username = this.form.get("username")?.value ;
      const email = this.form.get("email")?.value ;
      const password = this.form.get("password")?.value ;
      this.authService.register(username, email, password).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
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



onReset(): void {
  this.submitted = false;
  this.form.reset();
}

}