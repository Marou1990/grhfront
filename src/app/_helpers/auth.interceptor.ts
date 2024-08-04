import { HttpErrorResponse, HttpHandler, HttpInterceptorFn, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Subscription, throwError } from 'rxjs';
import { EventData } from '../forms/EventData';
import { AuthService } from '../services/auth.service';
import { EventBusService } from '../services/event-bus.service';
import { TokenStorageService } from '../services/token-storage.service';




const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end
 
 const  TokenStorage  = new TokenStorageService();

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = TokenStorage.getToken();
  let authReq = req;
  // Clone the request and add the authorization header
  console.log('  token  '+token);
  if (token != null) {
    // for Spring Boot back-end
    authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    // for Node.js Express back-end
    // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
  }

  // Pass the cloned request with the updated header to the next handler
  //return next(authReq);
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse &&
        !(req.url.includes('auth/signin') || req.url.includes('auth/signup'))) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors  
         //return this.intercept.handle401Error(req, next);       
          console.error('Unauthorized request:', err);
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err); 
    })
  );

  

};

export class intercept{

  private isRefreshing = false;
  eventBusSub : Subscription = new Subscription();

  constructor(private token: TokenStorageService,private router: Router,private authService: AuthService,
    private eventBusService: EventBusService) { }
    
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.token.getToken()) {
        this.eventBusService.emit(new EventData('logout', null));
      }
    }

    return next.handle(request);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true }
];
