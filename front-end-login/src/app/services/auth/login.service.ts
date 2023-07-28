import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currenUserData: BehaviorSubject<User> = new BehaviorSubject<User>({
    id: 0,
    email: '',
  });
  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<User> {
    return this.http.get<User>('././assets/data.json').pipe(
      tap((userData: User) => {
        this.currenUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Error found', error.error);
    } else {
      console.error(
        'Backend returned status code of ',
        error.status,
        error.error
      );
    }
    return throwError(() => new Error('Please try again'));
  }

  get userData(): Observable<User>{
    return this.currenUserData.asObservable()
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable()
  }
}
