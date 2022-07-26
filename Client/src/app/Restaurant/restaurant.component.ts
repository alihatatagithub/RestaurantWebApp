import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CityApiService } from '../City/city-api.service';
import { ICity } from '../Shared/Models/city';
import { IRestaurant } from '../Shared/Models/Restaurant';
import { RestaurantApiService } from './restaurant-api.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurants:IRestaurant[] = [];
  baseUrl =environment.BaseUrl;
  cities:ICity[] = [];
  cityId:number = 0;
  restaurantName:string = '';
  ngOnInit(): void {
   
  }

  Details(id:number){
    localStorage.setItem('rest_id',id.toString());
    this.router.navigateByUrl('/restaurantdetail/'+id);
  
  }
  constructor(private restaurantService:RestaurantApiService,
               private cityService:CityApiService ,
               private router:Router){

                  this.restaurantService.GetRestaurantByCityId(0,'').subscribe((res:any )=> {
                    this.restaurants = res;
                    console.log(res)
                  },error =>{
                    console.log(error);
                  })


    localStorage.setItem('email','');
    localStorage.setItem('name','');
    localStorage.setItem('phone','');
    localStorage.setItem('address','');

    this.GetCities();
  }



  GetCities(){
    this.cityService.GetCities().subscribe((res:any )=> {
      this.cities = res;
      console.log(res)
    },error =>{
      console.log("Error"+error);
    })
  }

  onSubmit(form:NgForm){
   
      this.restaurantService.GetRestaurantByCityId(this.cityId,this.restaurantName).subscribe((res:any )=> {
        this.restaurants = res;
        console.log(res)
      },error =>{
        console.log(error);
      })
  }


}
