import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { environment } from 'src/environments/environment';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  success: boolean = false

  faCheckCircle = faCheckCircle;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  categoryForm = new FormGroup({
    title: new FormControl(''),
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
      this.categoryForm.patchValue({
        imageSource: image
      });
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.categoryForm.get('title').value)
    formData.append('image', this.categoryForm.get('imageSource').value)
    
    this.http.post(`${environment.baseApi}/store/category/add/`, formData).subscribe(() => {
      this.success = true
    }, () => this.success = false)
  }

}
