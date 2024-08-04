import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../../../services/http-provider.service';
import { ResAuthForm } from '../../../forms/responseAuthForm';
import { userForm } from '../../../forms/userForm';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordRequestComponent } from '../reset-password-request/reset-password-request.component';
import { DataSharingService } from '../../../services/data-sharing.service';
import { TraceConnection } from '../../../forms/TraceConnection';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ToastrModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  resAuthForm: ResAuthForm = new ResAuthForm();
  user: userForm = new userForm();
  
   
/** TraceConnection */
  traceConnection: TraceConnection = {
    status    : 'Y',
    datecnx   : new Date(),
    datedecnx :new Date(),
    AdrMac    : '',
    AdrIP     : '',
    dateop    : new Date(),
    user      : this.user
  };

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private toastr: ToastrService, private httpProvider : HttpProviderService,private router: Router,
    public dialog: MatDialog,private dataSharingService: DataSharingService) {
      this.dataSharingService.isUserLoggedIn.next(false);
      this.dataSharingService.currentuser.next(null);

     }

  ngOnInit(): void {
    
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        
        
       
        if(data != null && data.status =='OK' ){
        this.user.id =  data.id;
        this.user.username =  data.username;
        this.user.email =  data.email;
        this.user.roles = data.roles ;
        
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(this.user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        window.sessionStorage.setItem('auth-isLoggedIn', 'true');
        this.roles = this.tokenStorage.getUser().roles;
        //this.reloadPage();
        this.router.navigate(['/Home']);
        this.dataSharingService.isUserLoggedIn.next(true);
        this.dataSharingService.currentuser.next(this.user);
        //on make trace 
        this.onTracecnx(this.user.id,this.traceConnection);
        }

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        window.sessionStorage.setItem('auth-isLoggedIn', 'false');
        this.dataSharingService.isUserLoggedIn.next(false);
        this.dataSharingService.currentuser.next(null);
      }
    );
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }
  onForgetPasword(): void {

    this.dialog.open(ResetPasswordRequestComponent, {
      width: '500px',  // Set your desired width
      height: '250px'  // Set your desired height
    });

    
  }
  

  reloadPage(): void {
    window.location.reload();
  }

   onTracecnx(iduser : number,traceConnection : TraceConnection ) {
    this.authService.saveTraceConnection(iduser,traceConnection).subscribe(response => {
      console.log('TraceConnection saved'+response);
      this.tokenStorage.savetrace(String(response.id));
      
    });
  }

}