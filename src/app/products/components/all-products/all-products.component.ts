import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products:any[] = [];
  store_id: string;
  cartProducts: any[] = [];
  amount: number = 0;

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

    this.store_id = this.router.url.split('/')[2]    

    this.getProducts(this.store_id)
  }

  getProducts(store_id) {
    this.service.getAllProducts(store_id).subscribe((res:any) => {
      this.products = res;
    }, err => {
      console.log(err);
    })
  }

  addToCart(event:any) {    
    if ( 'cart' in localStorage ) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);

      let exist = this.cartProducts.find(item => item.item.id === event.item.id);

      if ( exist ) {
        let item = exist.item
        let amount = event.amount + exist.amount

        this.cartProducts[this.cartProducts.indexOf(exist)] = {item, amount};        

        localStorage.setItem('cart', JSON.stringify(this.cartProducts))
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts))
      }

    } else {
      this.cartProducts.push(event);      
      localStorage.setItem('cart', JSON.stringify(this.cartProducts))
    }

    Emitters.cartEmitter.emit(event.amount)
  }

}
