import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map'

import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthenticationService {
  public loggedIn: Subject<boolean> = new Subject<boolean>();

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>('http://localhost:3000/api/users/authenticate', { email: email, password: password })
            .map(user => {
              console.log(user);
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.loggedIn.next(true);
                  // $rootScope.$broadcast('userLoggedIn');

                }
                return user;
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
      this.loggedIn.next(false);
    }
}
