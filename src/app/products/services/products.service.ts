import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getAllCategories() {
    return this.http.get(`${environment.baseApi}/store/categories/`);
  }

  getAllStores(cat_id) {
    return this.http.get(`${environment.baseApi}/store/stores/${cat_id}/`);
  }

  filterStores(city, cat_id) {
    return this.http.get(`${environment.baseApi}/store/stores/${cat_id}/${city}/`);
  }

  getAllProducts(store_id) {
    return this.http.get(`${environment.baseApi}/store/${store_id}/products`);
  }

  getProductDetails(store_id, product_id) {                    
    if ( store_id ) {
      return this.http.get(`${environment.baseApi}/store/${store_id}/products/details/${product_id}`);
    } else {
      return this.http.get(`${environment.baseApi}/products/details/${product_id}`);
    }
  }

  getSale() {
    return this.http.get(`${environment.baseApi}/products/sales/`)
  }

  getFeatured() {
    return this.http.get(`${environment.baseApi}/products/featured/`)
  }
}
