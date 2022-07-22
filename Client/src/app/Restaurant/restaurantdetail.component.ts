import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IProduct } from '../Shared/Models/product';
import { RestaurantApiService } from './restaurant-api.service';

@Component({
  selector: 'app-restaurantdetail',
  templateUrl: './restaurantdetail.component.html',
  styleUrls: ['./restaurantdetail.component.css']
})
export class RestaurantdetailComponent implements OnInit {
  baseUrl = environment.BaseUrl;

  productsIds: number []=[];
  IsBack:boolean = false;

   restaurantId:number = 0;
   products:IProduct[] = [];
  constructor(private router :Router, private _router:ActivatedRoute,public service:RestaurantApiService) { 

  }

  ngOnInit(): void {
    
   this.restaurantId = +this._router.snapshot.params['id'];
   localStorage.setItem('rest_id',this.restaurantId.toString());
   console.log(localStorage.getItem('rest_id'));
   if (localStorage.getItem('rest_id')) {
     console.log(true)
   }
  
   this.service.GetProductsByRestaurantId(this.restaurantId).subscribe((a:any) => {
     this.products = a;
   },error=>{
     console.log("Error"+error);
   })
   
  }

 

  OnSub(){
    this.router.navigateByUrl('customerreserve/'+this.productsIds[0]);
    localStorage.setItem('product_ids',this.productsIds.toString());
    console.log(this.productsIds);
  }
  CheckBoxMethod(id:number){
    var i =  this.productsIds.indexOf(id);

      if (!this.productsIds.includes(id)) {
        this.productsIds.push(id);
        this.service.productsIds.push(id);
        
      }
      else{
    
        this.productsIds.splice(i,1);
        this.service.productsIds.splice(i,1);

      }
      // console.log(this.productsIds);
    
  }
 


}

