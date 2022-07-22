import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICustomer } from '../Shared/Models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = environment.BaseUrl;
  private customerSource = new BehaviorSubject<ICustomer>({id:0,name:'',email:'',address:'',phone:''});
  customer$ = this.customerSource.asObservable();
  constructor(private http:HttpClient) { }

  CreateCustomer(customer:any){
    this.http.post(this.baseUrl + 'api/account/login', customer).subscribe((response:any)=>{
      this.customerSource.next(response);
      console.log(response);
    },error => {
      console.log(error)
    })
  }

  // GetCustomer(email:string){
  //     return this.http.get(this.baseUrl+'api/account/'+email);
    
  // }
}
