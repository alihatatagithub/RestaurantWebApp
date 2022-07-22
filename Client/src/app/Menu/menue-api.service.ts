import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenueApiService {
  baseUrl = environment.BaseUrl;

  constructor(private http:HttpClient) { }

  GetProductById(id:number){
    return this.http.get(this.baseUrl+'api/products/'+id);
  }
}
