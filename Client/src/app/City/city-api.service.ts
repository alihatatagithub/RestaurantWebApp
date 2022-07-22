import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityApiService {

  baseUrl = environment.BaseUrl;
  constructor(private http:HttpClient) { }
  GetCities(){
    return this.http.get(this.baseUrl+'api/cities');
  }

 
}
