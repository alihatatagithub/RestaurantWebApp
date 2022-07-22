import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RestaurantdetailComponent } from './Restaurant/restaurantdetail.component';
import { RestaurantComponent } from './Restaurant/restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerReserveComponent } from './Customer/customer-reserve.component';
import { OrderComponent } from './Order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantdetailComponent,
    RestaurantComponent,
    CustomerReserveComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
