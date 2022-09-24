import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IProduct } from '../Shared/Models/product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductsComponent implements OnInit {

  ProductList?: Observable<IProduct[]>;
  ProductList1?: Observable<IProduct[]>;
  productForm: any;
  massage = "";
  prodCategory = "";
  Id = 0;
  constructor(private formbulider: FormBuilder,
     private productService: ProductService,private router: Router,
     private jwtHelper : JwtHelperService) { }

  ngOnInit() {
    this.prodCategory = "0";
    this.productForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      PictureUrl: ['', [Validators.required]]
    });
    this.getProductList();
  }
  getProductList() {
    this.ProductList1 = this.productService.getProductList();
    this.ProductList = this.ProductList1;
  }
  PostProduct(product: IProduct) {
    const product_Master = this.productForm.value;
    this.productService.postProductData(product_Master).subscribe(
      () => {
        this.getProductList();
        this.productForm.reset();
        alert('Data Saved Successfully');
      }
    );
  }
  ProductDetailsToEdit(id: number) {
    this.productService.getProductDetailsById(id).subscribe(productResult => {
      this.Id = productResult.id;
      this.productForm.controls['Name'].setValue(productResult.name);
      this.productForm.controls['Price'].setValue(productResult.price);
      this.productForm.controls['Description'].setValue(productResult.description);
      this.productForm.controls['PictureUrl'].setValue(productResult.pictureUrl);
    });
  }
  UpdateProduct(product: IProduct) {
    product.id = this.Id;
    const product_Master = this.productForm.value;
    this.productService.updateProduct(product_Master).subscribe(() => {
      alert('Data Updated Successfully');
      this.productForm.reset();
      this.getProductList();
    });
  }

  DeleteProduct(id: number) {
    if (confirm('Do you want to delete this product?')) {
      this.productService.deleteProductById(id).subscribe(() => {
        alert('Data Deleted Successfully');
        this.getProductList();
      });
    }
  }

  Clear(product: IProduct){
    this.productForm.reset();
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

}