import { CanActivateFn } from '@angular/router';
import {Router } from '@angular/router';
import {TokenStorageService } from '../services/token-storage.service';
import {inject } from '@angular/core';




  export const AuthGuard: CanActivateFn = () => {
    const authService = inject(TokenStorageService);
    const router = inject(Router);
  
    if (authService.isLoggedIn()) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  };


