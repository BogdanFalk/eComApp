import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import * as _ from "lodash";
import { Product } from "./products/product";
import { Router } from "@angular/router";

interface NumberPerPage {
  value: number;
  viewValue: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  numberPerPage: NumberPerPage[] = [
    { value: 5, viewValue: "5 per page" },
    { value: 10, viewValue: "10 per page" },
    { value: 15, viewValue: "15 per page" },
    { value: 20, viewValue: "20 per page" },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.refreshCart();
  }

  numberPerPageControl = this.numberPerPage[0].value;
  cart: Product[] = [];

  @ViewChild("searchInput")
  searchInput!: ElementRef;

  title = "Home";

  clearCartProducts = false;

  searchValue = "";
  isCartShown = false;

  onEnter = (enterEvent: any) => {
    console.log(enterEvent.target.value);
    this.searchValue = enterEvent.target.value;
  };

  isInStockChecked = false;
  inStockChecked = (event: any) => {
    this.isInStockChecked = event.checked;
  };

  isOnSaleChecked = false;
  OnSaleChecked = (event: any) => {
    console.log(event);
    this.isOnSaleChecked = event.checked;
  };

  isNewChecked = false;
  NewChecked = (event: any) => {
    console.log(event);
    this.isNewChecked = event.checked;
  };

  showCart() {
    this.isCartShown = !this.isCartShown;
  }

  refreshCart() {
    this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log(this.cart);
  }

  getFullCartPrice() {
    return this.cart.reduce(function (a, b) {
      return a + b["price"] * b["inCartCount"];
    }, 0);
  }

  goToCart() {
    this.router.navigateByUrl("/cart");
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem("cart");
    this.clearCartProducts = !this.clearCartProducts;
  }

  /* To be removed */
  onSearchChange = _.debounce(() => {
    console.log("Searching...");
  }, 500);
}
