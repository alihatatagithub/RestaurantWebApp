import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantApiService } from './Restaurant/restaurant-api.service';
import { IRestaurant } from './Shared/Models/Restaurant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'Client';
}
