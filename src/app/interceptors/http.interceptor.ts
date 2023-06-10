import { Injectable } from '@angular/core';
import {
   HttpErrorResponse,
   HttpEvent,
   HttpHandler,
   HttpInterceptor,
   HttpRequest,
   HttpResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class HttpHandlerInterceptor implements HttpInterceptor {
   constructor(
      private _authService: AuthService
   ) {
   }
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let newReq = req.clone();

      if (this._authService.token) {
         newReq = req.clone({
            headers: req.headers.set('token', this._authService.token)
         });
      }

      // Response
      return next.handle(newReq).pipe(
         tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
               console.group(
                  '%c'+newReq.method,
                  'color: white; background-color: #3B82F6; padding: 2px; border-radius: 5px',
                  newReq.url,
                  newReq.body,
                  event?.body
               );
               console.groupEnd();
            }

         }),
         catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
               this._authService.signOut();
            }

            return throwError(error);
         })
      );
   }
}
