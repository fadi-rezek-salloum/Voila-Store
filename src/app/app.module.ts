import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LottieModule } from 'ngx-lottie';

import { AppComponent } from './app.component';


export function playerFactory() {
  return import('lottie-web');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    RouterModule,
    LottieModule.forRoot({ player: playerFactory }),
    
    SharedModule,
    ProductsModule,
    CartModule,
    UsersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
