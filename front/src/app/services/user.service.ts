import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import { User } from './../shared/models/User';
import { IUserLogin } from './../shared/interfaces/IUserLogin';
import { USER_LOGIN_URL } from './../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {

        },
        error: (errorResponse) => {

        }
      })
    )
  }
}
