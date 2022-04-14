import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newReq = req.clone({
            url: 'http://localhost:8080' + req.url,
            withCredentials: true
        });

        return next.handle(newReq).pipe(catchError(err => this.handleError(err)));
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        if (err.status === 401) {
            this.router.navigateByUrl('/login');
        }
        return throwError(() => err);
    }
}
