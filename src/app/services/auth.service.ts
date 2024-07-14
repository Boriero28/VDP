import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError,Observable, map, of, tap } from "rxjs";
import { JWTService } from "./jwt.service";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  picture: string;
}

export interface AddUser{
  firstName: string;
  lastName: string;
  username:string;
  password:string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private _currentUser$ = new BehaviorSubject<User | null>(null);

  currentUser$ = this._currentUser$.asObservable();

  constructor(private jwtSrv: JWTService,
              private http: HttpClient,
              private router: Router) {
    if (this.jwtSrv.hasToken()) {
      this.fetchUser();
    }
  }

  isLoggedIn() {
    return this.jwtSrv.hasToken();
  }

  addUser(newUser: AddUser): Observable<AddUser> {
    const url = 'https://vdpb-ackend-4ntva1u81-davides-projects-56acf969.vercel.app/api/register';
    return this.http.post<AddUser>(url, newUser)
    .pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  login(username: string, password: string) {
    return this.http.post<{user: User, token: string}>('https://vdpb-ackend-4ntva1u81-davides-projects-56acf969.vercel.app/api/login', {username, password})
      .pipe(
        tap(res => this.jwtSrv.setToken(res.token)),
        tap(res => this._currentUser$.next(res.user)),
        map(res => res.user)
      );
  }

  logout() {
    this.jwtSrv.removeToken();
    this._currentUser$.next(null);
    this.router.navigate(['/']);
  }

  private fetchUser() {
    this.http.get<User>('/api/users/me')
      .pipe(
        catchError(_ => {
          this.jwtSrv.removeToken();
          return of(null);
        })
      )
      .subscribe(user => this._currentUser$.next(user));
  }
}