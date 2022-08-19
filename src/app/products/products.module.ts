import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { AllStoresComponent } from './components/all-stores/all-stores.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddStoreComponent } from './components/add-store/add-store.component';
import { AddProductComponent } from './components/add-product/add-product.component';

@NgModule({
  declarations: [
    AllProductsComponent,
    ProductDetailsComponent,
    AllCategoriesComponent,
    AllStoresComponent,
    ProductComponent,
    AddCategoryComponent,
    AddStoreComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CarouselModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductsModule { }
