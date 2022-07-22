import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenueApiService } from '../Menu/menue-api.service';
import { RestaurantApiService } from '../Restaurant/restaurant-api.service';
import { ICustomer } from '../Shared/Models/customer';
import { IProduct } from '../Shared/Models/product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private customerSource = new BehaviorSubject<ICustomer>({id:0,name:'',email:'',address:'',phone:''});
  customer$ = this.customerSource.asObservable();
  productIds:number[] = [];
  customer:any;
  total:number = 0;
  num:number = 0;
  email:any;
  phone:any;
  address:any;
  name:any;
  products:IProduct[] = [];
  baseUrl = environment.BaseUrl;
  constructor(private service:MenueApiService,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
   this.email =  localStorage.getItem('email');
   this.name =  localStorage.getItem('name');
   this.phone =  localStorage.getItem('phone');
   this.address =  localStorage.getItem('address');
   console.log(this.email);
   console.log(this.name);
   console.log(this.address);
   console.log(this.phone);

   localStorage.getItem('product_ids')?.split(',').forEach(element => {

    this.productIds.push(parseInt(element));
    this.service.GetProductById(parseInt(element)).subscribe((a:any) => {
      this.products.push(a);
      
    },error =>{
      console.log("Error"+error);
    });
  });


  }
  ConfirmOrder(){
this.http.post(
  this.baseUrl+'api/Orders?name='+this.name+'&email='+this.email+'&phone='+this.phone+'&address='+this.address,
            localStorage.getItem('product_ids')?.split(',')).
        subscribe((a :any)=> {
          this.customerSource.next(a);
        },error => {console.log("Error"+error)})
        this.router.navigateByUrl('/restaurant');

  }
  

  Add(price:number){
    this.total = price + price;
  }
  Sub(price:number){
    this.total = price / 2;

  }

}
