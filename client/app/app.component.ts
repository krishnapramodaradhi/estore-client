import { Event, Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  showSpinner: boolean;
  constructor(private _router: Router, public userService: UserService) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showSpinner = true;
      }
      if (routerEvent instanceof NavigationEnd) {
        this.showSpinner = false;
      }
    });
    if (userService.getTokenData()) {
      userService.getProfile().subscribe(user => {
        const redirectUrl = localStorage.getItem("redirectUrl");

        if (!redirectUrl) {
          return;
        }
        localStorage.removeItem("redirectUrl");
        _router.navigateByUrl(redirectUrl);
      });
    }
  }

  ngOnInit() {
  }
}
