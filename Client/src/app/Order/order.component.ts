import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenueApiService } from '../Menu/menue-api.service';
import { RestaurantApiService } from '../Restaurant/restaurant-api.service';
import { ICustomer } from '../Shared/Models/customer';
import { IProduct } from '../Shared/Models/product';
import { OrderVM } from '../Shared/ViewModels/OrderVM';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private customerSource = new BehaviorSubject<ICustomer>({id:0,name:'',email:'',address:'',phone:''});
  customer$ = this.customerSource.asObservable();
  productIds:number[] = [];
 order = new OrderVM();

  customer:any;
  num:number = 0;
  email:any;
  phone:any;
  address:any;
  name:any;
  product:any;
  allTotal:number=0;
  products:IProduct[] = [];
  total:number[] = [];
  baseUrl = environment.BaseUrl;
  constructor(private service:MenueApiService,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
   
   this.email =  localStorage.getItem('email');
   this.name =  localStorage.getItem('name');
   this.phone =  localStorage.getItem('phone');
   this.address =  localStorage.getItem('address');
  
   console.log("ProductId"+localStorage.getItem('product_ids'));
   localStorage.getItem('product_ids')?.split(',').forEach(element => {

    this.productIds.push(parseInt(element));
    this.service.GetProductById(parseInt(element)).subscribe((a:any) => {

      this.product = {id:a.id,name:a.name,description:a.description,price:a.price,pictureUrl:a.pictureUrl,Qty :1};
      this.total[this.product.id] = a.price;
      this.allTotal +=a.price;
    
      this.products.push(this.product);

    },error =>{
      console.log("Error"+error);
    });
  });

  console.log("Length"+this.total.length)


  }
  ConfirmOrder(){
    this.order.email = this.email;
    this.order.name = this.name;
    this.order.address = this.address;
    this.order.phone = this.phone;
    for (let index = 0; index < this.products.length; index++) {
      this.order.productIds.push(this.products[index].id);
      
    }
    this.http.post(this.baseUrl+'api/orders',this.order).subscribe(a => {
      console.log("Success");
      localStorage.setItem('email','');
   localStorage.setItem('name','');
   localStorage.setItem('phone','');
   localStorage.setItem('address','');
      this.router.navigateByUrl('/restaurants');

    },error => {
      console.log("Error"+error);
    })
// this.http.post(this.baseUrl+'api/orders',)
 
  // this.router.navigateByUrl('/restaurant');

}
  

  Add(id:number){
    this.service.GetProductById(id).subscribe((a:any) => {
      var price = a.price;
      for (let index = 0; index < this.products.length; index++) {
         if (this.products[index].id == id) {
          this.products[index].Qty +=1;
          this.total[id] = price * (this.products[index].Qty);
          this.allTotal +=price;
         }
        
      }
      
    },error =>{
      console.log("Error"+error);
    });

  }
  Sub(id:number){
    this.service.GetProductById(id).subscribe((a:any) => {
      var price = a.price;
      for (let index = 0; index < this.products.length; index++) {
         if (this.products[index].id == id) {
          this.products[index].Qty -=1;
          this.total[id] = price * (this.products[index].Qty);
          this.allTotal -=price;
         }
        
      }
      
    },error =>{
      console.log("Error"+error);
    });

  }

  Delete(ProductId:number){

if (confirm("Press a button!") == true) {

  this.allTotal -= this.total[ProductId] ;
  this.products = this.products.filter(product=> product.id !==ProductId);
}
  }

  BackMethod(){

    this.router.navigateByUrl('/customerreserve');
  }


}
