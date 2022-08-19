import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';

import { faDollarSign, faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() data!:Product

  @Output() item = new EventEmitter();

  addToggleBtn:boolean = false;  
  amount:number = 0;
  store_id: string;

  cartProducts: any[] = []

  faDollarSign = faDollarSign;
  faCartPlus = faCartPlus;
  faCheck = faCheck;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store_id = this.router.url.split('/')[2]    
  }


  addToCart(event) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    if ( cart ) {
      cart.forEach(el => {
        if ( this.data.id === el.item.id ) {
          if ( el.amount + this.amount > el.item.quantity ) {
            this.amount = 0;
          }
        }
      }); 
    } else {
      if ( this.amount > this.data.quantity ) {
        this.amount = this.data.quantity
      }
    }

    this.item.emit({item:this.data ,amount:this.amount })
  }

  checkInStock(event) {

    if ( localStorage.getItem('cart') ) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart'))

      let exist = this.cartProducts.find(item => item.item.id === this.data.id);

      if ( exist ) {
        if (exist.amount + event.target.value > exist.item.quantity ) {
          alert('لا يوجد المزيد من هذا العنصر في المخزن!');
          this.addToggleBtn = false;                                                                                                                                                                                                                                                                                                            
        }
      } else {
        if ( event.target.value > this.data.quantity ) {
          alert('لا يوجد المزيد من هذا العنصر في المخزن!');
          this.addToggleBtn = false;                                                                                                                                                                                                                                                                                                            
        }
      }
    } else {
      if ( event.target.value > this.data.quantity ) {
        alert('لا يوجد المزيد من هذا العنصر في المخزن!');
        this.addToggleBtn = false;                                                                                                                                                                                                                                                                                                            
      }
    }
  }

  calculateDiscount(data) {
    return data.price - (data.discount * data.price / 100)
  }
 
}