import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { Product } from "../product";
import { ProductPageService } from "./productPage.service";

@Component({
  selector: "app-product-page",
  templateUrl: "./productPage.component.html",
  styleUrls: ["./productPage.component.scss"],
})
export class ProductPageComponent implements OnInit {
  title = "cart";
  cart: Product[] = [];

  selectedProduct: any;

  constructor(
    private route: ActivatedRoute,
    private productPageService: ProductPageService
  ) {}

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    this.route.params.subscribe((params: Params) => {
      let productName = params["productName"];
      this.productPageService
        .getProductByName({
          name: productName,
        })
        .subscribe((response) => {
          this.selectedProduct = <Product>response;
          console.log(this.selectedProduct);
        });
    });
  }
}
