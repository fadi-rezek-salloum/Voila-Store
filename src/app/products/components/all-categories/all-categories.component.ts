import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { Emitters } from 'src/app/emitters/emitters';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css'],
})
export class AllCategoriesComponent implements OnInit {

  baseURL: string = 'http://localhost:8000';

  sale_products:any[] = [];
  featured_products:any[] = [];
  cartProducts: any[] = [];
  amount: number = 0;

  customOptions: OwlOptions = {
    loop: false,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  }

  categories:any[] = []

  constructor(
    private service:ProductsService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/accounts/user/', { withCredentials: true }).subscribe((res: any) => {
      Emitters.authEmitter.emit(true);
    }, err => {
      console.log(err);
      Emitters.authEmitter.emit(false);
      this.router.navigate(['/login'])
    })

    this.getCategories();
    this.getSaleProducts()
    this.getFeaturedProducts()
  }

  getCategories() {
    this.service.getAllCategories().subscribe((res:any) => {
      this.categories = res;      
    }, err => {
      console.log(err)
    })
  } 

  getSaleProducts() {
    this.service.getSale().subscribe((res:any) => {
      this.sale_products = res;      
    }, err => {
      console.log(err)
    })
  }

  getFeaturedProducts() {
    this.service.getFeatured().subscribe((res:any) => {
      this.featured_products = res;      
    }, err => {
      console.log(err)
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
