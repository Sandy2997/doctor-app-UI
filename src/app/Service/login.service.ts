import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { loginDetails } from '../Shared/material/constent';
import { USERS } from '../Shared/mockdata';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  getUserDetails(): Observable<loginDetails[]> {
    const users = of(USERS);
    return users;
  }

}
