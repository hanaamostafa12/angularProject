import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() data: any = {};
  @Output() item = new EventEmitter<{ item: any, quantity: number }>();

  addButton: boolean = false;
  amount: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {}

  viewDetails(productId: number) {
    this.router.navigate([`/productdetails/${productId}`]);
  }

  add() {
    if (this.amount > 1) {
      this.item.emit({ item: this.data, quantity: this.amount });
    }
  }
}
