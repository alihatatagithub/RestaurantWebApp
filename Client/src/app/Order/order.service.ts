import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderCompletedVM } from '../Shared/ViewModels/OrderCompletedVM';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.BaseUrl;

  constructor(private http:HttpClient) { }

  GetOrderByCustomerName(CustomerName:any): Observable<OrderCompletedVM>{
    return this.http.get<OrderCompletedVM>(this.baseUrl+'api/orders/GetOrderByCustomerName/'+CustomerName);
  }
}
