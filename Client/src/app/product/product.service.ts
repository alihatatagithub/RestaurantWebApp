import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../Shared/Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.BaseUrl + 'api/product/';
  constructor(private http: HttpClient) { }
  getProductList(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  }
  postProductData(productData: IProduct): Observable<IProduct> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<IProduct>(this.url, productData, httpHeaders);
  }
  updateProduct(product: IProduct): Observable<IProduct> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.put<IProduct>(this.url , product, httpHeaders);
  }
  deleteProductById(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(this.url + '' + id);
    }
  getProductDetailsById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.url +''+ id);
  }
}