import { ApplicationConfig,importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import {provideClientHydration } from '@angular/platform-browser';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AddRowDirective } from './components/detail-profil/AddRowDirective';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from './_helpers/auth.interceptor';


 export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideClientHydration(),
              provideAnimations(), // required animations providers
              provideToastr(), // Toastr providers
              provideHttpClient(),
              provideHttpClient(withFetch()),
              importProvidersFrom(AddRowDirective), provideAnimationsAsync() ,// Register the directive here
              provideHttpClient(withInterceptors([authInterceptor]))
             ],

             
};
