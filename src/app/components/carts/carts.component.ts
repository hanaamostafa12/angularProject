import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Products } from './../../shared/interfaces/products';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  cartProducts: any[] = [];
  
  total: number = 0;
  userId: string | null = '';
  success: boolean = false;


  constructor(private service: CartService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getCartProducts();
  }

  getCartProducts() {
    if ("cart" in localStorage && "token" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    this.getCartTotal();
  }

  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.updateCartInLocalStorage();
    this.toastr.success("Updated cart");
  }

  minsAmount(index: number) {
    if (this.cartProducts[index].quantity > 1) {
      this.cartProducts[index].quantity--;
      this.updateCartInLocalStorage();
      this.toastr.success("Updated cart");
    }
  }

  detectChange() {
    this.updateCartInLocalStorage();
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.updateCartInLocalStorage();
    this.toastr.error("Deleted successfully");
  }


  clearCart() {
    this.cartProducts = [];
    this.updateCartInLocalStorage();
    this.toastr.error("Cart cleared successfully");
  }

  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  addCart() {
    let products = this.cartProducts.map(item => {
      return { productId: item.item.id, quantity: item.quantity };
    });

    let model = {
      userId: 5,
      date: new Date(),
      products: products
    };

    this.service.createNewCart(model).subscribe(res => {
      this.success = true;
      this.clearCart();
      this.toastr.success("Order placed successfully");
    });

    console.log(model);
  }

  updateCartInLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }
}
