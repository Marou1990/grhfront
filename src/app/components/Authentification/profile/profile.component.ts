import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenStorageService } from '../../../services/token-storage.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../../../services/http-provider.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule,ToastrModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  currenttoken !: any;

  constructor(private token: TokenStorageService,
    private toastr: ToastrService, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.currentUser  = this.token.getUser();
    this.currenttoken = this.token.getToken();
  }
}