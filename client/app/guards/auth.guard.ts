import { LoginComponent } from './../common/login/login.component';
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { UserService } from "../services/user.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router, private _modalService: NgbModal) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this._userService.getTokenData()) {
      return this._userService.getProfile().map(
        user => {
          if (user.role === 'admin') { return true; }
          return true;
        },
        err => {
          this._router.navigate(["/home/products"], { queryParams: { redirectUrl: state.url } });
          this._modalService.open(LoginComponent);
          return false;
        }
      );
    }
    this._router.navigate(["/home/products"], { queryParams: { redirectUrl: state.url } });
    this._modalService.open(LoginComponent);
    return false;
  }
}
