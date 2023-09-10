import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {
  xsrfHeaderName = 'X-XSRF-TOKEN';
  
  constructor(private tokenService: HttpXsrfTokenExtractor) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');
    const xsrfToken = this.tokenService.getToken();
    
    /* request = request.clone({
      withCredentials: true
    }); */

    if (token && request.url.includes(env.api)) {
        request = request.clone({ 
          setHeaders:{
            Accept: 'application/json',
            Authorization:'Bearer ' + token
          }
        });
    }

    /* if (xsrfToken !== null && !request.headers.has(this.xsrfHeaderName)) {
      request = request.clone({headers: request.headers.set(this.xsrfHeaderName, xsrfToken)});
    } */

    return next.handle(request);
  }
}
