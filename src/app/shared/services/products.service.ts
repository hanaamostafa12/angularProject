import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }
  private baseUrl = 'https://fakestoreapi.com/products';
  getProducts():Observable<any>{
   return this._HttpClient.get("https://fakestoreapi.com/products")
  }
   
  getSpecificProduct(productId:any):Observable<any>{
    return this._HttpClient.get(`https://fakestoreapi.com/products/${productId}`)
  }
  getCategories():Observable<any>{
    return this._HttpClient.get("https://fakestoreapi.com/products/categories")
   }
   
   getSpecificCategories(category: string):Observable<any>{
     return this._HttpClient.get(`https://fakestoreapi.com/products/category/${category}`)
  }
   
  getAllBrand():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
  getBrand(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
  }
}
