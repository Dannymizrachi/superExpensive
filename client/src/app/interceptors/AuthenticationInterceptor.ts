import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/UserService';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    // They will need to use their own userService for this (need save the token there after login)
    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with our token if available
        let token:string;
        token = sessionStorage.getItem("LoginToken");
        if (token) {
            token = token +"";
            request = request.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }

        return next.handle(request);
    }
}
