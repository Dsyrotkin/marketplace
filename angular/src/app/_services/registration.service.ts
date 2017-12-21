import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class RegistrationService {
    constructor(private http: HttpClient) { }

    register(email: string, password: string, username: string, firstName: string, lastName: string) {
      return this.http.post<any>('http://localhost:3000/api/users/register', {
          email: email,
          password: password,
          username: username,
          lastName: lastName,
          firstName: firstName
      })
      .map(user => {
          return user.data;
      });
    }

}
