import { Observable } from "rxjs/Observable";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "../login/login.component";
import "rxjs/add/operator/take";
import { Router } from "@angular/router";
import { oUser } from "../../models/user";

@Component({
  selector: "app-navbar-primary",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;
  first = true;
  loggedInUser: any;

  constructor(
    private _router: Router,
    public userService: UserService,
    private _modalService: NgbModal
  ) {}

  open() {
    this._modalService.open(LoginComponent);
  }

  logout() {
    this.userService.logout();
    this._router.navigate(["/home/products"]);
  }

  ngOnInit() {
  }
}
