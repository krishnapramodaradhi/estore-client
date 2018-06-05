import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-navbar-secondary",
  templateUrl: "./navbar-secondary.component.html",
  styleUrls: ["./navbar-secondary.component.scss"]
})
export class NavbarSecondaryComponent implements OnInit {

  isCollapsed = false;
  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
  }

}
