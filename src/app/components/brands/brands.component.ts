import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  constructor(private  _ProductsService: ProductsService) { }
  loading:boolean = false;
  
  brands: any[] = [];
  specificBrand: any = {} ;
  ngOnInit(): void {
    this.loading = true;
    this._ProductsService.getAllBrand().subscribe({

       
      next: (data) => {
        this.brands = data.data;
        this.loading = false;
        console.log(this.brands);
      },
    });
  }
  selectBrand(id: string) {
    this._ProductsService.getBrand(id).subscribe({
      next: (data) => {
        this.specificBrand = data.data;
      },
    });
  }
}
