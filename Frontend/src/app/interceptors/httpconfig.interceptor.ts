import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');

    request = request.clone({
      withCredentials: true
    });

    if (token && request.url.includes(env.api)) {
        request = request.clone({ 
          setHeaders:{
            Authorization:'Bearer ' + token
          }
        });
    }

    return next.handle(request);
  }
}
