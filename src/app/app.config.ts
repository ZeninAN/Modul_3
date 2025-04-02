import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const JWT_PRIVATE_KEY = 'QlboYugGjXSEqVZwbNrP9Kj8yk5N6gNtg6GcPGYFe5XjC48Te0ctuyYLycbURJpLE5eVFv1wxaWjIxyNPHE3TiBqTlhMePYPPKZwpWkr9gSc5cNS9xGIS83qytuJaNLl00eppkvNP5KljnXH6Mm3vNXLVEZryZtRKCDI1QQtDOO5N23TKHDyLgYgetCrgZiSj1RNnhu8mgfvNjD6z69RMHEZRRQSwVJwQohF6HEamjTOTruk1xM4SNzCJqIC0ZuO';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    
  ]
};