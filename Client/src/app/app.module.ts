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
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './product/product.component';
import { AuthGuard } from './guards/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { OrderCompletedComponent } from './Order/order-completed.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    RestaurantdetailComponent,
    RestaurantComponent,
    CustomerReserveComponent,
    OrderComponent,
    LoginComponent,
    ProductsComponent,
    OrderCompletedComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44382"],
        disallowedRoutes: []
      }
  }),    
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
