import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { environment } from 'src/environments/environment';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent implements OnInit {

  success: boolean = false

  faCheckCircle = faCheckCircle;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  storeForm = new FormGroup({
    email: new FormControl(''),
    category: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    rating: new FormControl(''),
    open_at: new FormControl(''),
    close_at: new FormControl(''),
    image: new FormControl(''),
    imageSource: new FormControl('')
  })

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/accounts/user/', { withCredentials: true }).subscribe((res: any) => {
      Emitters.authEmitter.emit(true);
    }, err => {
      console.log(err);
      Emitters.authEmitter.emit(false);
      this.router.navigate(['/login'])
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.storeForm.patchValue({
        imageSource: image
      });
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.storeForm.get('email').value)
    formData.append('category', this.storeForm.get('category').value)
    formData.append('name', this.storeForm.get('name').value)
    formData.append('address', this.storeForm.get('address').value)
    formData.append('city', this.storeForm.get('city').value)
    formData.append('rating', this.storeForm.get('rating').value)
    formData.append('open_at', this.storeForm.get('open_at').value)
    formData.append('close_at', this.storeForm.get('close_at').value)
    formData.append('image', this.storeForm.get('imageSource').value)
    
    this.http.post(`${environment.baseApi}/store/store/add/`, formData).subscribe(() => {
      this.success = true
    }, () => this.success = false)
  }

}
