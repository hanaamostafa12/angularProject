import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../shared/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  loading: boolean = false;
  

  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsService:ProductsService) { }
   productId :any 
   product:any
  ngOnInit():void {
    this.loading=true;
    this._ActivatedRoute.paramMap.subscribe((params) => {
              this.productId = params.get('id')
    }) 


    this._ProductsService.getSpecificProduct(this.productId).subscribe({
      next: (response) =>{

        this.loading=false;
                console.log(response)
         this.product =response

      }, 
      error:(err)=> {
        this.loading=false;
        console.log(err)
      },
    })
  }

}
