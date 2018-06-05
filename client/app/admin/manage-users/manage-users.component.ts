import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { oUser } from '../../models/user';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit, OnDestroy {

  filteredUsers: oUser.User[] = [];
  users: oUser.User[] = [];
  sub: Subscription;

  constructor(private _userService: UserService) { }

  filter(query: string) {
    this.filteredUsers = query
      ? this.users.filter(p => p.username.toLowerCase().includes(query.toLowerCase()))
      : this.users;
  }

  ngOnInit() {
   this.sub = this._userService.getAll().subscribe(d => this.filteredUsers = this.users = d);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
