import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-stores',
  templateUrl: './all-stores.component.html',
  styleUrls: ['./all-stores.component.css']
})
export class AllStoresComponent implements OnInit {

  cat_id: string;

  stores:any[] = []

  city: string = ''

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: ProductsService
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/accounts/user/', { withCredentials: true }).subscribe((res: any) => {
      Emitters.authEmitter.emit(true);
    }, err => {
      console.log(err);
      Emitters.authEmitter.emit(false);
      this.router.navigate(['/login'])
    })

    this.cat_id = this.router.url.split('/')[2]
    
    this.getStores(this.cat_id);    
  }

  getStores(cat_id) {
    this.service.getAllStores(cat_id).subscribe((res:any) => {
      this.stores = res;     
    }, err => {
      console.log(err)
    })
  } 

  filterCity($event) {
    this.city = $event.target.value;
    this.service.filterStores(this.city, this.cat_id).subscribe((res:any) => {
      this.stores = res;
    }, err => {
      console.log(err)
    })
  }

}
