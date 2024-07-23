import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  msgError: string = ""

  constructor(private _FormBuilder: FormBuilder, private _AuthServiceService:AuthServiceService,private _Router: Router) { }

  ngOnInit() {
  }
  registerForm:FormGroup = this._FormBuilder.group ({
    username: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
    password: ['', [Validators.required]],
    
  });

  handleRegister(){
    if(this.registerForm.valid){
     this.isLoading=true ;
     this._AuthServiceService.getLogin(this.registerForm.value).subscribe({
       next:(response)=>{
           this.isLoading=false ;
              console.log(response)
              localStorage.setItem("token",response.token)
              this._AuthServiceService.saveUserData()
              this._Router.navigate(['/home'])
       },
       error:(err:HttpErrorResponse)=>{
         this.isLoading=false ;
         this.msgError =err.error
         console.log( this.msgError)
       }
     })
    }
   }

   
}
