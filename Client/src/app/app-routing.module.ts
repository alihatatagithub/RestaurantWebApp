import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerReserveComponent } from './Customer/customer-reserve.component';
import { OrderComponent } from './Order/order.component';
import { RestaurantComponent } from './Restaurant/restaurant.component';
import { RestaurantdetailComponent } from './Restaurant/restaurantdetail.component';

const routes: Routes = [
  {path:'restaurants',component:RestaurantComponent},
  {path:'',component:RestaurantComponent},
  {path:'restaurantdetail/:id',component:RestaurantdetailComponent},
  {path:'customerreserve/:id',component:CustomerReserveComponent},
  {path:'order',component:OrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
