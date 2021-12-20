import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Apply the headers
    const token: any = localStorage.getItem('token');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    // Also handle errors globally
    return next.handle(req).pipe(
      tap(x => x, err => {
        // Handle this err
        console.error(`Error performing request, status code = ${err.status}`);
      })
    );
  }
}

/**
 * Configuration for the performed HTTP requests
 */
/*
@Injectable()
export class ApiRequestConfiguration {
  private nextAuthHeader?: string;
  private nextAuthValue?: string;

  // Set to basic authentication 
  basic(user: string, password: string): void {
    this.nextAuthHeader = 'Authorization';
    this.nextAuthValue = 'Basic ' + btoa(user + ':' + password);
  }

  // Set to session key 
  session(sessionKey: string): void {
    this.nextAuthHeader = 'Session';
    this.nextAuthValue = sessionKey;
  }

  // Clear any authentication headers (to be called after logout) 
  clear(): void {
    this.nextAuthHeader = "";
    this.nextAuthValue = "";
  }

  // Apply the current authorization headers to the given request 
  apply(req: HttpRequest<any>): HttpRequest<any> {
    const headers: any = {};
    if (this.nextAuthHeader) {
      headers[this.nextAuthHeader] = this.nextAuthValue;
    }
    // Apply the headers to the request
    return req.clone({
      setHeaders: headers
    });
  }
}
*/