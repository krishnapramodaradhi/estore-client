import { Observable } from 'rxjs/Observable';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { oUser } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  id: string;
  user: oUser.User;
  form: FormGroup;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _userService: UserService
  ) { }

  createForm(): void {
    this.form = this._fb.group({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      role: ""
    });
  }

  public updateUser(): void {
    if (this.id) {
      this._userService.update(this.id, this.form.value).subscribe();
    }
    setTimeout(() => {
      return this._router.navigate(["/admin/manage-users"]);
    }, 1000);
  }

  getUser(): void {
    this.id = this._route.snapshot.paramMap.get("id");
    if (this.id) {
      this._userService
        .get(this.id)
        .take(1)
        .subscribe(u => {
          this.user = u;
          this.form.setValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            username: this.user.username,
            role: this.user.role
          });
        });
    }
  }

  deleteUser(): void {
    this._userService.delete(this.id).subscribe();
    setTimeout(() => {
      return this._router.navigate(["/admin/manage-users"]);
    }, 1000);
  }

  ngOnInit() {
    this.createForm();
    this.getUser();
  }

}
