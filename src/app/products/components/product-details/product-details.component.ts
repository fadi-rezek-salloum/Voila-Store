import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { ProductsService } from '../../services/products.service';

import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  faCartPlus = faCartPlus;

  product:any = null

  product_id: any;
  store_id: any;

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
      this.router.navigate(['/login']);
    })

    this.store_id = this.router.url.split('/')[2];
    if ( this.store_id == 'products' ) {
      this.store_id = null;
      this.product_id = this.router.url.split('/')[4];
    } else {
      this.store_id = Number.parseInt(this.store_id);
      this.product_id = Number.parseInt(this.router.url.split('/')[5]);
    }
    
    this.getProduct(this.store_id, this.product_id);
  }

  getProduct(store_id, product_id) {
    this.service.getProductDetails(store_id, product_id).subscribe((res:any) => {
      this.product = res;
    }, err => {
      console.log(err);
    })
  }

}
