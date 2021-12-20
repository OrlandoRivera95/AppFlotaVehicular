/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { NewUser } from '../models/new-user';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation userControllerSignUp
   */
  static readonly UserControllerSignUpPath = '/signup';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `signUp()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signUp$Response(params?: {
    body?: NewUser
  }): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.UserControllerSignUpPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `signUp$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signUp(params?: {
    body?: NewUser
  }): Observable<User> {

    return this.signUp$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation userControllerLogin
   */
  static readonly UserControllerLoginPath = '/users/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: {

    /**
     * The input of login function
     */
    body: {
'email': string;
'password': string;
}
  }): Observable<StrictHttpResponse<{
'token'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.UserControllerLoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'token'?: string;
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: {

    /**
     * The input of login function
     */
    body: {
'email': string;
'password': string;
}
  }): Observable<{
'token'?: string;
}> {

    return this.login$Response(params).pipe(
      map((r: StrictHttpResponse<{
'token'?: string;
}>) => r.body as {
'token'?: string;
})
    );
  }

  /**
   * Path part for operation userControllerWhoAmI
   */
  static readonly UserControllerWhoAmIPath = '/whoAmI';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `whoAmI()` instead.
   *
   * This method doesn't expect any request body.
   */
  whoAmI$Response(params?: {
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.UserControllerWhoAmIPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `whoAmI$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  whoAmI(params?: {
  }): Observable<string> {

    return this.whoAmI$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
