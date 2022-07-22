import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRestaurant } from '../Shared/Models/Restaurant';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestaurantApiService {

  baseUrl = environment.BaseUrl;
  productsIds: number [] = [];
    constructor(private http:HttpClient) { }
    GetRestaurant(){
      return this.http.get(this.baseUrl+'api/restaurants');
    }

    GetRestaurantByCityId(cityId:number,searchName:string){
      return this.http.get(this.baseUrl+'api/restaurants/city/'+cityId+'?searchName='+searchName);
    }

    GetProductsByRestaurantId(id:number){
      return this.http.get(this.baseUrl+'api/products/restaurant/'+id);
    }
}
