import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { faEnvelope, faLock, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faEnvelope = faEnvelope;
  faLock = faLock;
  faSignIn = faSignIn;

  form: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    })
  }

  getUserRole() {
    this.http.get(`${environment.baseApi}/accounts/user/`, {withCredentials: true}).subscribe(
      res => {        
        Emitters.roleEmitter.emit(res['is_staff'])
      }
    )
  }

  submit(): void {    
    this.http.post(`${environment.baseApi}/accounts/login/`, this.form.getRawValue(), {
      withCredentials: true
    }).subscribe(() => {
      this.getUserRole()
      this.router.navigate(['/'])
    }, (err) => {
      console.log(err);
      Emitters.roleEmitter.emit(false)
    });
  }

}
