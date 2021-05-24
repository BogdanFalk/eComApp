import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Product } from "./product";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ProductService {
  private getProductsPerPageUrl = "/getProductsPerPage";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  listProducts(params: any) {
    const endpoint =
      "http://localhost:8080/getProductsPerPage?numberOfProductsPerPage=" +
      params.numberOfProductsPerPage +
      "&numberOfPage=" +
      params.numberOfPage +
      "";
    return this.http.get(endpoint);
  }

  listProductsSearch(params: any) {
    const endpoint =
      "http://localhost:8080/getProductsWhichContainFiltered?search=" +
      params.search +
      "&numberOfProductsPerPage=" +
      params.numberOfProductsPerPage +
      "&numberOfPage=" +
      params.numberOfPage +
      "&isNew=" +
      params.isNew +
      "&isOnSale=" +
      params.isOnSale +
      "&isInStock=" +
      params.isInStock;
    return this.http.get(endpoint);
  }
}
