import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../shared/services/products.service';
import { Products } from '../../shared/interfaces/products';
import { Router } from '@angular/router';
import { CartService } from './../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Products[] = [];
  categories: any[] = [];
  cartProducts: any[] = [];
  loading: boolean = false;
  userCart: any;
  searchTerm: string = "";

  constructor(
    private _ProductsService: ProductsService,
    private _Router: Router,
    private _CartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllProducts();
    this.getCategories();
  }

  getAllProducts() {
    this.loading = true;
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      }
    });
  }

  viewDetails(productId: number) {
    this._Router.navigate([`/productdetails/${productId}`]);
  }

  getCategories() {
    this.loading = true;
    this._ProductsService.getCategories().subscribe(cat => {
      this.loading = false;
      this.categories = cat;
      console.log(cat);
    });
  }

  filtercat(event: any) {
    let value = event.target.value;
    console.log(value);
    if (value == "all") {
      this.getAllProducts();
    } else {
      this._ProductsService.getSpecificCategories(value).subscribe((data: any) => {
        this.products = data;
      });
    }
  }

  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find(item => item.item.id == event.item.id);

      if (exist) {
        this.updateCartProduct(event);
      } else {
        this.cartProducts.push(event);
        this.updateCartInLocalStorage();
        this.toastr.success("Successfully added to cart");
      }
    } else {
      this.createCart(event);
    }
  }

  createCart(event: any) {
    this.cartProducts.push(event);
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.toastr.success("Cart created and product added");
  }

  updateCartProduct(event: any) {
    this.cartProducts = this.cartProducts.map(item => {
      if (item.item.id === event.item.id) {
        item.quantity += event.quantity;
      }
      return item;
    });
    this.updateCartInLocalStorage();
    this.toastr.success("Cart updated successfully");
  }

  updateCartInLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  
}
