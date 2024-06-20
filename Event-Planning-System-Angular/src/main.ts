import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'zone.js';


import { registerLicense } from '@syncfusion/ej2-base';

// Register the Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXlfdnVXRGZcVEZzWUA=');


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
