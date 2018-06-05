import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: UserService
  ) { }

  /**
   * createForm
   */
  public createForm(): void {
    this.form = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    });
  }

  /**
   * onRegister
   */
  public onRegister(): void {
    this._userService.register(this.form.value).take(1)
      .subscribe(user => this._router.navigate(['/home/products']), err => this.error = err.error);
  }

  /**
   * resetForm
   */
  public resetForm(): void {
    this.form.reset();
  }

  ngOnInit() {
    this.createForm();
  }

}
