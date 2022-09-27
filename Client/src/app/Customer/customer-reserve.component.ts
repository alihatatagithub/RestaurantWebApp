import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  product:any;
  baseUrl :string = environment.BaseUrl;
  productIds:number[] = [];
  phonePattern:any;
  emailPattern:string='';
  customerForm:any;
  products:IProduct[] = [];
  // productId:number =0;

  constructor(private formbulider: FormBuilder,
              private rmenueService:MenueApiService,
              private customerService:CustomerService,
              private router:Router,
               private _router:ActivatedRoute) { }

  ngOnInit(): void {
    // this.productId = +this._router.snapshot.params['id'];

    localStorage.getItem('product_ids')?.split(',').forEach(element => {

      this.productIds.push(parseInt(element));
      this.rmenueService.GetProductById(parseInt(element)).subscribe((a:any) => {
  
        this.product = {id:a.id,name:a.name,description:a.description,price:a.price,pictureUrl:a.pictureUrl,Qty :1};
        this.products.push(this.product);
  
      },error =>{
        console.log("Error"+error);
      });
    });
    console.log(localStorage.getItem('product_ids'))
    

    this.phonePattern = "^[0-9]{8,15}$";
    this.customerForm = this.formbulider.group({
      Name: [localStorage.getItem('name'), [Validators.required]],
      Phone: [localStorage.getItem('phone'),[Validators.required,Validators.pattern(this.phonePattern)]],
      Email: [localStorage.getItem('email'), [Validators.required,Validators.email]],
      Address: [localStorage.getItem('address'), [Validators.required]],
    
    });
    
  }

  onSubmit(){
   
    localStorage.setItem('name',this.customerForm.get('Name').value);
    localStorage.setItem('phone',this.customerForm.get('Phone').value);

      localStorage.setItem('email',this.customerForm.get('Email').value)
      localStorage.setItem('address',this.customerForm.get('Address').value)
      this.router.navigateByUrl('order');
    
   
  }
  BackMethod(){
    localStorage.setItem('backFromCustomerReserve','true');
    this.router.navigateByUrl('/restaurantdetail/'+localStorage.getItem('rest_id')+'/'+1);
  }

}
