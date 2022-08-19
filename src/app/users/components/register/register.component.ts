import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';

import { faUser, faPhoneAlt, faEnvelope, faLock, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faUser = faUser;
  faPhoneAlt = faPhoneAlt;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUserPlus = faUserPlus;

  form: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstname: new FormControl(null),
      lastname: new FormControl(null),
      mobile: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null)
    });
  }

  submit(): void {
    this.http.post(`${environment.baseApi}/accounts/register/`, this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/login']));
  }

}
