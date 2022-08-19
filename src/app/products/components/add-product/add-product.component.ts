import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Emitters } from 'src/app/emitters/emitters';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  success: boolean = false

  faCheckCircle = faCheckCircle;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/accounts/user/', { withCredentials: true }).subscribe((res: any) => {
      Emitters.authEmitter.emit(true);
    }, err => {
      console.log(err);
      Emitters.authEmitter.emit(false);
      this.router.navigate(['/login'])
    })
  }

  productForm = new FormGroup({
    store: new FormControl(''),
    title: new FormControl(''),
    price: new FormControl(''),
    discount: new FormControl(''),
    quantity: new FormControl(''),
    rating: new FormControl(''),
    content: new FormControl(''),
    featured: new FormControl(''),
    image: new FormControl(''),
    imageSource: new FormControl('')
  })

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.productForm.patchValue({
        imageSource: image
      });
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('store', this.productForm.get('store').value)
    formData.append('title', this.productForm.get('title').value)
    formData.append('price', this.productForm.get('price').value)
    formData.append('discount', this.productForm.get('discount').value)
    formData.append('quantity', this.productForm.get('quantity').value)
    formData.append('rating', this.productForm.get('rating').value)
    formData.append('content', this.productForm.get('content').value)
    formData.append('featured', this.productForm.get('featured').value)
    formData.append('image', this.productForm.get('imageSource').value)    
    
    this.http.post(`${environment.baseApi}/products/add/`, formData).subscribe(() => {
      this.success = true
    }, () => this.success = false)
  }

}
