import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { Product, ProductListResponse } from "./product";
import { ProductService } from "./product.service";
import { catchError, finalize } from "rxjs/operators";
import { HomeComponent } from "../home.component";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  @Input() productsPerPage = 5;
  @Input() search = "";
  @Input() inStockChecked = false;
  @Input() newChecked = false;
  @Input() onSaleChecked = false;
  @Input() clearCart = false;
  @Output() refreshShoppingCart: EventEmitter<any> = new EventEmitter();
  products: Product[] = [];

  cart: Product[] = [];

  page = 0;
  maxPages = 99;
  totalElements = 999;
  numberPerPageControl = 5;

  constructor(private productService: ProductService) {}

  refreshMemoryCart() {
    window.localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  getProductsSearch(
    search: string,
    productsPerPage: string,
    numberOfPage: string
  ) {
    this.productService
      .listProductsSearch({
        search: search,
        numberOfProductsPerPage: productsPerPage,
        numberOfPage: numberOfPage,
        isNew: this.newChecked ? "1" : "0",
        isOnSale: this.onSaleChecked ? "1" : "0",
        isInStock: this.inStockChecked ? "1" : "0",
      })
      .subscribe((response) => {
        console.log(response);
        const plr = <ProductListResponse>response;
        this.products = plr.content.map((product) => {
          var tempProduct = Object.assign({}, product);
          tempProduct.purchaseCount = 1;
          tempProduct.inCartCount = 0;
          return tempProduct;
        });

        this.numberPerPageControl = plr.numberOfElements;
        this.totalElements = plr.totalElements;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.productsPerPage != undefined) {
      if (!changes.productsPerPage.isFirstChange()) {
        if (
          changes.productsPerPage.currentValue !=
          changes.productsPerPage.previousValue
        ) {
          console.log("Gimmie New Nr Per Page");
          this.numberPerPageControl = changes.productsPerPage.currentValue;
          this.onPerPageChange(this.numberPerPageControl);
        }
      }
    }

    if (changes.search != undefined) {
      if (!changes.search.isFirstChange()) {
        if (changes.search.currentValue != changes.search.previousValue) {
          this.onSearchChange(changes.search.currentValue);
        }
      }
    }

    if (changes.inStockChecked != undefined) {
      if (!changes.inStockChecked.isFirstChange()) {
        if (
          changes.inStockChecked.currentValue !=
          changes.inStockChecked.previousValue
        ) {
          this.onSearchChange(this.search);
        }
      }
    }

    if (changes.newChecked != undefined) {
      if (!changes.newChecked.isFirstChange()) {
        if (
          changes.newChecked.currentValue != changes.newChecked.previousValue
        ) {
          this.onSearchChange(this.search);
        }
      }
    }

    if (changes.onSaleChecked != undefined) {
      if (!changes.onSaleChecked.isFirstChange()) {
        if (
          changes.onSaleChecked.currentValue !=
          changes.onSaleChecked.previousValue
        ) {
          this.onSearchChange(this.search);
        }
      }
    }

    if (changes.clearCart != undefined) {
      if (!changes.clearCart.isFirstChange()) {
        if (changes.clearCart.currentValue != changes.clearCart.previousValue) {
          this.cart = [];
          localStorage.removeItem("cart");
        }
      }
    }
  }

  ngOnInit() {
    this.cart = this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    this.getProductsSearch("", this.numberPerPageControl.toString(), "0");
  }

  onPageChange(pageNumber: number) {
    this.getProductsSearch(
      this.search,
      this.numberPerPageControl.toString(),
      (pageNumber - 1).toString()
    );
  }

  onPerPageChange(perPageNumber: number) {
    this.getProductsSearch(this.search, perPageNumber.toString(), "0");
  }

  onSearchChange(searchValue: string) {
    console.log("Gonna show:" + this.productsPerPage);
    this.getProductsSearch(
      searchValue,
      this.numberPerPageControl < this.productsPerPage
        ? this.productsPerPage.toString()
        : this.numberPerPageControl.toString(),
      "0"
    );
  }

  increaseQuantity(e: any, product: Product) {
    e.stopPropagation();
    product.purchaseCount++;
  }

  decreaseQuantity(e: any, product: Product) {
    e.stopPropagation();
    if (product.purchaseCount > 1) product.purchaseCount--;
  }

  containsObject(obj: Product, list: Product[]) {
    var x;
    for (x in list) {
      if (list.hasOwnProperty(x) && list[x].name === obj.name) {
        return true;
      }
    }
    return false;
  }

  addToCart(e: any, product: any) {
    e.stopPropagation();
    if (this.containsObject(product, this.cart)) {
      let productIndex = this.cart.findIndex((obj) => obj.name == product.name);
      this.cart[productIndex].inCartCount += product.purchaseCount;
      console.log(this.cart);
    } else {
      product.inCartCount = product.purchaseCount;
      this.cart.push(product);
    }
    this.refreshMemoryCart();
    this.refreshShoppingCart.emit();
  }
}
