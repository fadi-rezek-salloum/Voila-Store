import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { faCartShopping, faHomeAlt, faBagShopping, faSignOut, faGear } from '@fortawesome/free-solid-svg-icons'
import { Emitters } from 'src/app/emitters/emitters';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authenticated: boolean = false;
  count: number = 0;
  role: boolean = false;
  cartProducts: any[] = [];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {    
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });

    Emitters.cartEmitter.subscribe((count: number) => {
      this.count += count;
    })

    Emitters.roleEmitter.subscribe(role => {
      this.role = role
    })
  }

  faCartShopping = faCartShopping;
  faHomeAlt = faHomeAlt;
  faBagShopping = faBagShopping;
  faSignOut = faSignOut;
  faGear = faGear;

  logout(): void {
    this.http.post(`${environment.baseApi}/accounts/logout/`, {}, { withCredentials: true }).subscribe(() => {
      this.authenticated = false;
      Emitters.roleEmitter.emit(false)
    })    
  }
}
