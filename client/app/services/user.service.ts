import { oUser } from "./../models/user";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class UserService {
  private _BASE_URI = "http://localhost:8765/user-service/users";

  constructor(private _http: HttpClient, private _route: ActivatedRoute) {}

  register(userData: object): Observable<oUser.User> {
    return this._http.post<oUser.User>(
      this._BASE_URI + "/",
      userData
    );
  }

  login(loginData: oUser.User): Observable<oUser.RegisteredOrLoginUser> {
    const redirectUrl =
      this._route.snapshot.queryParamMap.get("redirectUrl") || "";
    localStorage.setItem("redirectUrl", redirectUrl);

    return this._http.post<oUser.RegisteredOrLoginUser>(
      this._BASE_URI + "/login",
      loginData
    );
  }

  getAll(): Observable<oUser.User[]> {
    return this._http.get<oUser.User[]>(this._BASE_URI);
  }

  get(id: string): Observable<oUser.User> {
    return this._http.get<oUser.User>(this._BASE_URI + "/" + id);
  }

  update(id: string, user: oUser.User): Observable<oUser.User> {
    return this._http.patch<oUser.User>(this._BASE_URI + "/" + id, user);
  }

  delete(id: string): Observable<oUser.User> {
    return this._http.delete<oUser.User>(this._BASE_URI + "/" + id);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  getProfile(): Observable<oUser.User> {
    return this._http.get<oUser.User>(this._BASE_URI + "/profile", {
      headers: new HttpHeaders().set("Token", localStorage.getItem("token"))
    });
  }

  setTokenData(token?: string): void {
    if (token) {
      localStorage.setItem("token", token);
    }
  }

  setUserData(user: string) {
    localStorage.setItem("user", user);
  }

  getTokenData() {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
  }

  getUserData(): oUser.User {
    return JSON.parse(localStorage.getItem("user"));
  }

  removeToken(): void {
    localStorage.removeItem("token");
  }

  logout() {
    localStorage.clear();
  }
}
