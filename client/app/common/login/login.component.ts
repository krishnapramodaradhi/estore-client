import { Router } from '@angular/router';
import { UserService } from "./../../services/user.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { oUser } from '../../models/user';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errMessage: string;
  alert: string;
  noExpiry: boolean;
  content = "Your one account for everything";

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: UserService,
    public activeModal: NgbActiveModal
  ) {}

  onLogin() {
    this._userService
      .login(this.form.value)
      .subscribe(
        user => {
          this._userService.setTokenData(JSON.stringify(user));
          this._userService.getProfile().subscribe(d => this._userService.setUserData(JSON.stringify(d)));
          this.activeModal.close();
          this._router.navigate(['/home/products']);
        },
        err => {
          this.alert = 'danger';
          this.errMessage = err.error;
        }
      );
  }

  ngOnInit() {
    this.form = this._fb.group({
      email: "",
      password: "",
      keepMeLoggedIn: ""
    });
  }
}
