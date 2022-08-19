import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Emitters } from 'src/app/emitters/emitters';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  options: AnimationOptions = {    
    path: '../../../../assets/images/landing.json'  
  }; 

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get(`${environment.baseApi}/accounts/user/`, { withCredentials: true }).subscribe((res: any) => {
      Emitters.authEmitter.emit(true);
      this.router.navigate(['/categories'])
    }, err => {
      console.log(err);
      Emitters.authEmitter.emit(false);
    })
  }

}
