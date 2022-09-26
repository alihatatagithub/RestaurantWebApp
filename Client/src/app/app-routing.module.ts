import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerReserveComponent } from './Customer/customer-reserve.component';
import { AuthGuard } from './guards/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './Order/order.component';
import { ProductsComponent } from './product/product.component';
import { RestaurantComponent } from './Restaurant/restaurant.component';
import { RestaurantdetailComponent } from './Restaurant/restaurantdetail.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'product',component:ProductsComponent,canActivate:[AuthGuard]},
  {path:'restaurants',component:RestaurantComponent},
  {path:'',component:RestaurantComponent},
  {path:'restaurantdetail/:id',component:RestaurantdetailComponent},
  {path:'customerreserve',component:CustomerReserveComponent},
  {path:'order',component:OrderComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
