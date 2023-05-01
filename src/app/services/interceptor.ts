import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActionService } from './action.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private actionService: ActionService, public router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.actionService.startLoader();
    request = request.clone({
      setHeaders: {
        'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
      }
    });
    return next.handle(request).pipe(
      catchError((err, caught) => {
        this.actionService.stopLoader();
        throw err;
      })
    );
  }
}
