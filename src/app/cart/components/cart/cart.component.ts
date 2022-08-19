import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { CartService } from '../../services/cart.service';

import { faCheckCircle, faTrash, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  faTrash = faTrash;
  faCartShopping = faCartShopping;

  constructor(
    private service: CartService,
    private http: HttpClient,
    private router: Router
  ) { }

  cartProducts:any[] = [];
  total:number = 0;
  success:boolean = false;
  address: string = '';

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/accounts/user/', { withCredentials: true }).subscribe((res: any) => {
      Emitters.authEmitter.emit(true);
    }, err => {
      console.log(err);
      Emitters.authEmitter.emit(false);
      this.router.navigate(['/login'])
    })

    this.getCartProducts()
  }

  getCartProducts() {
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal()
  }

  addAmount(index:number) {
    if ( this.cartProducts[index].item.quantity === this.cartProducts[index].amount ) {
      alert('لا يوجد المزيد من هذا العنصر في المخزن!');
      return                                                                                                                                                                                                                                               
    } else {
      this.cartProducts[index].amount++
      this.getCartTotal()
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
    }    

    Emitters.cartEmitter.emit(1)
    
  }

  minsAmount(index:number) {
    this.cartProducts[index].amount--
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))

    Emitters.cartEmitter.emit(-1)
  }

  deleteProduct(index:number) {
    Emitters.cartEmitter.emit(this.cartProducts[index].amount * -1)

    this.cartProducts.splice(index , 1)
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }

  clearCart() {

    this.cartProducts.forEach(item => {
      Emitters.cartEmitter.emit(item.amount * -1)
    })

    this.cartProducts = []
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }

  getCartTotal() {
    this.total = 0
    for(let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].amount;
    }
  }

  addCart() {   
    let products = this.cartProducts.map(item => {
      return {productId:item.item.id , amount:item.amount}
    })

    let Model = {
      products:products,
      address: this.address,
    }

    this.service.createNewCart(Model).subscribe(res => {
      this.success = true
    })
  }

}
