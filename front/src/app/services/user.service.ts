import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import { User } from './../shared/models/User';
import { IUserLogin } from './../shared/interfaces/IUserLogin';
import { USER_LOGIN_URL } from './../shared/constants/urls';

const USER_KEY = 'User';

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
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          // this.toastrService.success(
          //   `Welcome to Foodmine ${user.name}!`,
          //   'Login Successful'
          // )
          console.log(`Welcome to Foodmine ${user.name}!`)
        },
        error: (errorResponse) => {
          // this.toastrService.error(errorResponse.error, 'Login Failed');
          console.log(errorResponse.error)
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
