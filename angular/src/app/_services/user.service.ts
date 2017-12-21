import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('http://localhost:3000/api/users/list');
    }

    getByUsername(username: string) {
        return this.http.get('http://localhost:3000/api/users/' + username);
    }

    create(user: User) {
        return this.http.post('http://localhost:3000/api/users', user);
    }

    update(user: User) {
        return this.http.put('http://localhost:3000/api/users/' + user.username, user);
    }

    delete(username: string) {
        return this.http.delete('http://localhost:3000/api/users/' + username);
    }
}
