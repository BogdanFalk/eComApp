import { Component, OnInit } from "@angular/core";
import { Product } from "../home/products/product";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  title = "cart";
  cart: Product[] = [];

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
  }

  getFullCartPrice() {
    return this.cart.reduce(function (a, b) {
      return a + b["price"] * b["inCartCount"];
    }, 0);
  }
}
