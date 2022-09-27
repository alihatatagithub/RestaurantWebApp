import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MenueApiService } from '../Menu/menue-api.service';
import { ProductService } from '../product/product.service';
import { IProduct } from '../Shared/Models/product';
import { IRestaurant } from '../Shared/Models/Restaurant';
import { RestaurantApiService } from './restaurant-api.service';

@Component({
  selector: 'app-restaurantdetail',
  templateUrl: './restaurantdetail.component.html',
  styleUrls: ['./restaurantdetail.component.css']
})
export class RestaurantdetailComponent implements OnInit {
  baseUrl = environment.BaseUrl;

  productsIds: number []=[];
  IsBackFromCustomerReserve:number=0
  IsBack:boolean = false;
   restaurantId:any = 0;
   tst:any;
   product:IProduct = {id:0,name:'',description:'',isActive : false,pictureUrl:'',price:0,Qty:1};
   products:IProduct[] = [];
   productsFromApi:IProduct[] = [];
  constructor(private router :Router,
     private _router:ActivatedRoute,
     public service:RestaurantApiService,
     public productService:ProductService,
     public rmenueService:MenueApiService) { 

  }

  ngOnInit(): void {
  

    this.restaurantId = +this._router.snapshot.params['id'];


    this.IsBackFromCustomerReserve = +this._router.snapshot.params['isback'];
    
    if (this.IsBackFromCustomerReserve == 1) {
 
      localStorage.getItem('product_ids')?.split(',').forEach(element => {

      this.productsIds.push(parseInt(element));
      this.rmenueService.GetProductById(parseInt(element)).subscribe((a:any) => {
  
        this.product = {id:a.id,name:a.name,isActive:true,description:a.description,price:a.price,pictureUrl:a.pictureUrl,Qty :1};
        this.products.push(this.product);
  
      },error =>{
        console.log("Error"+error);
      });
    });

    this.service.GetProductsByRestaurantId(this.restaurantId).subscribe((a:any) => {
      this.productsFromApi = a;
      
    },error=>{
      console.log("Error"+error);
    })
   

    }
    else{
 
     this.service.GetProductsByRestaurantId(this.restaurantId).subscribe((a:any) => {
       this.products = a;
       
     },error=>{
       console.log("Error"+error);
     })
 
     console.log("false")
    }

    
  }


 

  OnSub(){
    this.router.navigateByUrl('customerreserve');
    localStorage.setItem('product_ids',this.productsIds.toString());
    localStorage.setItem('backFromCustomerReserve','false');
  }
  CheckBoxMethod(id:number){

    var i =  this.productsIds.indexOf(id);

      if (!this.productsIds.includes(id)) {
        this.productsIds.push(id);
        this.service.productsIds.push(id);


        for (let index = 0; index < this.products.length; index++) {
          if (this.products[index].id == id) {
            console.log(id);
            this.products[index].isActive = !this.products[index].isActive;
            console.log(this.products[index].isActive);

          }
          
        }
        
      }
      else{
    
        this.productsIds.splice(i,1);
        this.service.productsIds.splice(i,1);

        for (let index = 0; index < this.products.length; index++) {
          if (this.products[index].id == id) {
            this.products[index].isActive = !this.products[index].isActive;
          }
          
        }

      }
    
  }
 


}

