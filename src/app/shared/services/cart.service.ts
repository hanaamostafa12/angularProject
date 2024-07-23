
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http:HttpClient) { }

  createNewCart(model:any) {
    return this.http.post("https://fakestoreapi.com/" + 'carts' , model )
  }

  
  getUserCart(userId: string): Observable<any> {
    return this.http.get(`https://fakestoreapi.com/carts/user/${userId}`);
  }
  
  deleteUserCart(productId:number):Observable<any>{
               return this.http.delete(`https://fakestoreapi.com/carts/${productId}`)
  } 
}
