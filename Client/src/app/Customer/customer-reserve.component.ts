import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MenueApiService } from '../Menu/menue-api.service';
import { RestaurantApiService } from '../Restaurant/restaurant-api.service';
import { IProduct } from '../Shared/Models/product';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer-reserve',
  templateUrl: './customer-reserve.component.html',
  styleUrls: ['./customer-reserve.component.css']
})
export class CustomerReserveComponent implements OnInit {

  // productsIds: number []= this.restaurantService.productsIds;
  product:IProduct = {id:0,name:'',description:'',price:0,pictureUrl:''};
  baseUrl :string = environment.BaseUrl;
  customerName:string = '';
  customerEmail:string = '';
  customerAddress:string = '';
  customerPhone:string = '';

  newCustomer = {name:this.customerName,email:this.customerEmail,address:this.customerAddress,phone:this.customerPhone}
  productId:number =0;

  constructor(private rmenueService:MenueApiService,
              private customerService:CustomerService,
              private router:Router,
               private _router:ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = +this._router.snapshot.params['id'];

    console.log(localStorage.getItem('product_ids'))
    
     this.rmenueService.GetProductById(this.productId).subscribe((a:any)=>{
      this.product = a;
    },error=>{
      console.log("error"+error);
    })
    
  }

  onSubmit(loginForm:NgForm){
    if (loginForm.valid) {
      // this.customerService.CreateCustomer(this.newCustomer);
      localStorage.setItem('email',this.customerEmail)
      localStorage.setItem('name',this.customerName)
      localStorage.setItem('phone',this.customerPhone)
      localStorage.setItem('address',this.customerAddress)
      this.router.navigateByUrl('order');
    }
    
   
  }
  BackMethod(){
    this.router.navigateByUrl('/restaurantdetail/'+localStorage.getItem('rest_id'));
  }

}
