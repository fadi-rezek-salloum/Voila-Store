import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/components/cart/cart.component';


import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginComponent } from './users/components/login/login.component';
import { RegisterComponent } from './users/components/register/register.component';
import { AllCategoriesComponent } from './products/components/all-categories/all-categories.component';
import { AllStoresComponent } from './products/components/all-stores/all-stores.component';
import { HomeComponent } from './shared/components/home/home.component';
import { AddCategoryComponent } from './products/components/add-category/add-category.component';
import { AddStoreComponent } from './products/components/add-store/add-store.component';
import { AddProductComponent } from './products/components/add-product/add-product.component';

const routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: 'categories', component: AllCategoriesComponent},
  {path: 'stores/:id', component: AllStoresComponent},
  {path: 'stores/:id/products', component: AllProductsComponent},
  {path: 'stores/products/details/:product_id', component: ProductDetailsComponent},
  {path: 'stores/:store_id/products/details/:product_id', component: ProductDetailsComponent},

  {path: 'category/add', component: AddCategoryComponent},
  {path: 'store/add', component: AddStoreComponent},
  {path: 'product/add', component: AddProductComponent},

  {path: 'cart', component: CartComponent},

  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
