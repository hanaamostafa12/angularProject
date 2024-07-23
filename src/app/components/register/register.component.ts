import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading: boolean = false;

  constructor(private _FormBuilder: FormBuilder, private _AuthServiceService:AuthServiceService,private _Router: Router) { }

  ngOnInit() {
  }
    registerForm:FormGroup = this._FormBuilder.group ({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      password: ['', [Validators.required,Validators.pattern(/^[a-z][A-Za-z0-9@$]{6,}$/)]],
      firstname: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      lastname: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      city: ['', [Validators.required,Validators.pattern(/^[a-zA-Z\s'-]+$/)]],
      street: ['', Validators.required],
      number: ['', [Validators.required]],
      zipcode: ['', [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)]],
      lat: ['', [Validators.required,Validators.pattern(/^-?([1-8]?[0-9](\.\d+)?|90(\.0+)?)$/)]],
      long: ['', [Validators.required,Validators.pattern(/^-?((1[0-7][0-9]|[1-9]?[0-9])(\.\d+)?|180(\.0+)?)$/)]],
      phone: ['', [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
    });
    handleRegister(){
     if(this.registerForm.valid){
      this.isLoading=true 
      this._AuthServiceService.getRegister(this.registerForm.value).subscribe({
        next:(response)=>{
            this.isLoading=false 
               console.log(response)
               this._Router.navigate(['/login'])
        },
        error:(error)=>{
          this.isLoading=false 
          console.log(error)
        }
      })
     }
    }
}
