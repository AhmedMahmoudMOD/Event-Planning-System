import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { addtokenInterceptor } from './shared/interceptors/addtoken.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withInterceptors([addtokenInterceptor])),provideAnimations() ]
};
