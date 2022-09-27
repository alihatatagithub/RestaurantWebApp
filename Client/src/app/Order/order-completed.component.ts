import { Component, OnInit } from '@angular/core';
import { OrderCompletedVM } from '../Shared/ViewModels/OrderCompletedVM';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.css']
})
export class OrderCompletedComponent implements OnInit {

  email:any;
  phone:any;
  address:any;
  name:any;
  age:any;
  orderCompletedvm:OrderCompletedVM = new OrderCompletedVM() ;
  constructor(private orderService:OrderService) { 
    
    this.email =  localStorage.getItem('email');
    this.name =  localStorage.getItem('name');
    this.phone =  localStorage.getItem('phone');
    this.address =  localStorage.getItem('address');

     this.orderService.GetOrderByCustomerName(this.name).subscribe((a : OrderCompletedVM)=> {
      this.orderCompletedvm.id = a.id;
      this.orderCompletedvm.createdDate = a.createdDate;
      this.orderCompletedvm.total = a.total;
     },error =>{
      console.log(error);
     });

  }
  ngOnInit(): void {
  }

}
