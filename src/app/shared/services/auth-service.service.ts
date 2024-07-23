import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private _HttpClient:HttpClient,private _Router :Router) { }

    userData: any 

    

    saveUserData(){
      if(localStorage.getItem("token")!==null){
           let encodeToken:any = localStorage.getItem("token")
           let decodeToken = jwtDecode(encodeToken)
           this.userData = decodeToken
           localStorage.setItem("userId", this.userData.id);  // Save user ID in local storage
           console.log(decodeToken)
      }
    }
     
    logOut(){
      localStorage.removeItem("token")
      localStorage.removeItem("cart"); // Remove user ID on logout
       this._Router.navigate(['/login']);
    }
   getRegister(UsrData:object): Observable<any>{
     return  this._HttpClient.post("https://fakestoreapi.com/users",UsrData)
   }

   getLogin(userData: object): Observable<any> {
    return this._HttpClient.post("https://fakestoreapi.com/auth/login", userData).pipe(
      tap((res: any) => {
        localStorage.setItem("token", res.token);
        this.saveUserData();
      })
    );
}

}